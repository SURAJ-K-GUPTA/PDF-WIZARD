from sqlalchemy.orm import Session
from .models import Document, ChatHistory

def save_document(db: Session, filename: str, content: str):
    document = Document(filename=filename, content=content)
    db.add(document)
    db.commit()
    db.refresh(document)
    return document

def get_document_by_filename(db: Session, filename: str):
    return db.query(Document).filter_by(filename=filename).first()

def save_chat_history(db: Session, document_id: int, question: str, answer: str):
    chat = ChatHistory(document_id=document_id, question=question, answer=answer)
    db.add(chat)
    db.commit()
    return chat
