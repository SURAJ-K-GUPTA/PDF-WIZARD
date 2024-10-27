# PDF Wizard

PDF Wizard is a web application that allows users to upload PDF documents and ask questions about their content. The system processes the document using Natural Language Processing (NLP) and answers user queries based on the document's text. Additionally, it maintains a chat history, enabling users to ask follow-up questions within the same context.

## Features

* **Upload PDF**: Users can upload a PDF, and the application extracts its text for NLP processing.
* **Ask Questions**: Users can ask questions about the content of an uploaded PDF, and the system will respond with relevant answers.
* **Chat History**: Users can view previous questions and answers for each PDF, with the option to use the chat history for contextual responses.

## Technologies Used

* **Backend Framework**: FastAPI
* **NLP Processing**: Hugging Face Transformers & Google Gemini API (optional)
* **Database**: SQLite or PostgreSQL (for document metadata and chat history)
* **File Processing**: PyMuPDF for extracting text from PDFs
* **Environment Management**: dotenv for loading environment variables
* **Frontend Framework**: React.js responsive

## Getting Started

### Prerequisites

* Python 3.8+
* FastAPI
* SQLite or PostgreSQL for database
* Hugging Face Transformers (`transformers` library)
* PyMuPDF (`fitz` library)
* Google Gemini API access (optional for enhanced answers)

### Installation

1. Clone this repository:
    
