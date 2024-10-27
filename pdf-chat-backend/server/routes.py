from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Form
from sqlalchemy.orm import Session
from transformers import pipeline
from langchain_community.document_loaders import PyMuPDFLoader
import requests
from typing import Optional
from .db import SessionLocal, engine, init_db
from .models import Document, ChatHistory
from .schemas import QuestionRequest, UploadResponse
from .crud import save_document, get_document_by_filename, save_chat_history
import os
import fitz  # PyMuPDF
import io
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

load_dotenv()  # Loads environment variables from .env file

DATABASE_URL = os.environ.get("DATABASE_URL")

pdfRoute = APIRouter()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@pdfRoute.get("/", tags=["Root"])
async def read_root():
  return { 
    "message": "Welcome to my PDF WIZARD application, first upload the pdf and then ask questions in the chat"
   }


# Hugging Face Question Answering Model
# question_answerer = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")
question_answerer = pipeline("question-answering", model="deepset/roberta-base-squad2")
# Use the correct model ID
# model_id = "sentence-transformers/all-mpnet-base-v2"

# # Load the model
# question_answerer = pipeline("question-answering", model=model_id)
# Endpoint to upload a PDF and parse text, saving only the text content to DB
@pdfRoute.post("/upload", response_model=UploadResponse)
async def upload_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:

        # Check if a document with the same filename already exists in the database
        existing_document = get_document_by_filename(db, file.filename)
        if existing_document:
            # If it exists, return the filename without parsing again
            return JSONResponse(content={"filename": file.filename}, status_code=200)
        
        
        # Step 1: Read the uploaded PDF data into memory
        pdf_data = await file.read()
        pdf_stream = io.BytesIO(pdf_data)  # Convert to in-memory file-like object

        # Step 2: Parse text content using fitz (PyMuPDF)
        document_text = ""
        pdf_document = fitz.open("pdf", pdf_stream)
        
        for page_num in range(pdf_document.page_count):
            page = pdf_document[page_num]
            document_text += page.get_text("text")  # Extract text from each page

        pdf_document.close()

        # Step 3: Save parsed text content to DB
        save_document(db, filename=file.filename, content=document_text)

        return JSONResponse(content={"filename": file.filename}, status_code=200)
    except Exception as e:
         return HTTPException(status_code=500, detail="File upload failed.")


# Endpoint to ask a question based on a PDF's content
# Endpoint to ask a question based on a PDF's content
@pdfRoute.post("/ask")
async def ask_question(
    request: QuestionRequest,
    db: Session = Depends(get_db),
):
    try:
        # Retrieve document content from the database
        document = get_document_by_filename(db, request.file_name)
        if not document:
            raise HTTPException(status_code=404, detail="File not found.")
        
        # Retrieve recent chat history for additional context (last 5 questions and answers)
        chat_history = db.query(ChatHistory).filter_by(document_id=document.id).order_by(ChatHistory.timestamp.desc()).limit(5).all()
        history_context = " ".join([f"Q: {h.question} A: {h.answer}" for h in chat_history])

        # Prepare the context by combining the document content and history context
        combined_context = f"{document.content} {history_context}"
        
        # Use Hugging Face model by default
        if not request.better_answer:
            response = question_answerer(question=request.question, context=combined_context)
            answer = response["answer"]
        else:
            # Use Google Gemini for enhanced answers if `better_answer` is True
            gemini_response = requests.post(
                f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={os.getenv('GEMINI_API_KEY')}",
                headers={"Content-Type": "application/json"},
                json={
                    "contents": [
                        {
                            "parts": [
                                {"text": f"Based on the document text and recent history: '{combined_context}', answer this question: '{request.question}'"}
                            ]
                        }
                    ]
                }
            )
            gemini_result = gemini_response.json()
            answer = gemini_result["candidates"][0]["content"]["parts"][0]["text"]

        # Save question and answer to chat history
        save_chat_history(db, document_id=document.id, question=request.question, answer=answer)

        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error answering question: {str(e)}")
    
@pdfRoute.get("/history/{filename}")
async def get_chat_history(filename: str, db: Session = Depends(get_db)):
    try:
        document = get_document_by_filename(db, filename)
        if not document:
            raise HTTPException(status_code=404, detail="File not found.")
        
        history = db.query(ChatHistory).filter_by(document_id=document.id).all()
        return [{"question": h.question, "answer": h.answer, "timestamp": h.timestamp} for h in history]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving chat history: {str(e)}")
