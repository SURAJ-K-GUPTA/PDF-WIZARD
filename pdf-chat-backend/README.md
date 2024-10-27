# PDF Wizard Backend

This backend application allows users to upload PDF documents and ask questions about their content. The system processes the document using Natural Language Processing (NLP) and answers user queries based on the document's text. Additionally, it maintains a chat history, enabling users to ask follow-up questions within the same context.

## Features

- **Upload PDF**: Users can upload a PDF, and the application extracts its text for NLP processing.
- **Ask Questions**: Users can ask questions about the content of an uploaded PDF, and the system will respond with relevant answers.
- **Chat History**: Users can view previous questions and answers for each PDF, with the option to use the chat history for contextual responses.

## Technologies Used

- **Backend Framework**: FastAPI
- **NLP Processing**: Hugging Face Transformers & Google Gemini API (optional)
- **Database**: SQLite or PostgreSQL (for document metadata and chat history)
- **File Processing**: PyMuPDF for extracting text from PDFs
- **Environment Management**: dotenv for loading environment variables

## Getting Started

### Prerequisites

- Python 3.8+
- FastAPI
- SQLite or PostgreSQL for database
- Hugging Face Transformers (`transformers` library)
- PyMuPDF (`fitz` library)
- Google Gemini API access (optional for enhanced answers)

### Installation

1. Clone this repository:
```
   git clone https://github.com/your-username/pdf-wizard.git
   cd pdf-wizard-backend
```
2. Set up a virtual environment and install dependencies:
```
    python -m venv venv
```
(For Windows) 
```
venv\Scripts\activate
```
(For Unix/Linux/Mac)
```
source venv/bin/activate

```

3. Install the required dependencies:
```
pip install -r requirements.txt
```

Configure environment variables:

Create a **hidden** `.env` file in the root directory and add the following variables:
```
DATABASE_URL=sqlite:///./test.db  # Replace with your database URL
GEMINI_API_KEY=your_google_gemini_api_key  # Optional

```
Run the Server
To start the FastAPI server, run:

```
uvicorn server.api:app --reload
```

API Documentation
--------------------------------

FastAPI provides interactive API documentation at <http://127.0.0.1:8000/docs>.

API Endpoints
------------

### 1. Upload PDF

Endpoint: `/upload`
Method: `POST`
Parameters: PDF file as form-data
Description: Uploads a PDF file, extracts its text content, and stores it in the database.

Request Example:
```
curl -X 'POST' \
  'http://127.0.0.1:8000/upload' \
  -F 'file=@your_pdf_file.pdf'

```
Response:
```
{
  "filename": "your_pdf_file.pdf"
}
```
### 2. Ask Question

Endpoint: `/ask`
Method: `POST`
Parameters:

question (string): The question related to the PDF content.
file_name (string): Name of the uploaded PDF file.
better_answer (boolean, optional): If true, uses the Google Gemini API for enhanced answers.
Description: Processes the question with the document content and returns an answer. Uses either Hugging Face or Google Gemini for NLP.

Request Example:

```
curl -X 'POST' \
  'http://127.0.0.1:8000/ask' \
  -H 'Content-Type: application/json' \
  -d '{
    "question": "What is mentioned about PDF parsing?",
    "file_name": "your_pdf_file.pdf",
    "better_answer": true
  }'
  ```
Response:

```
{
  "answer": "PDF parsing is mentioned as a way to extract text from PDFs."
}

```
3. Get Chat History
Endpoint: /history/{filename}
Method: GET
Parameters: filename (string) - The name of the uploaded PDF file
Description: Retrieves the chat history for the specified document, showing past questions and answers.

Request Example:

```
curl -X 'GET' 'http://127.0.0.1:8000/history/your_pdf_file.pdf'

```
Response:

```
[
  {
    "question": "What is PDF parsing?",
    "answer": "PDF parsing is the process of extracting text from a PDF.",
    "timestamp": "2024-01-01T12:00:00"
  },
  ...
]
```
