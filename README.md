# PDF Wizard

PDF Wizard is a web application that allows users to upload PDF documents and ask questions about their content. The system processes the document using Natural Language Processing (NLP) and answers user queries based on the document's text. Additionally, it maintains a chat history, enabling users to ask follow-up questions within the same context.

You can try the PDF Wizard application at [https://pdf-wizard-eight.vercel.app/](https://pdf-wizard-eight.vercel.app/).

You can check the demo of PDF Wizard application at [https://drive.google.com/file/d/1PyOoJv4_oUnRZfuv9IN31hMq-lG3VbK7/view](https://drive.google.com/file/d/1PyOoJv4_oUnRZfuv9IN31hMq-lG3VbK7/view)

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
    
2. Separate Instructions (README.md) for frontend and backend are given in respective directories.


# Frontend Setup

3. Change to the frontend directory:
```
    cd pdf-chat-frontend
```

## PDF Wizard Frontend

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To use the API, you need to add a `.env` file in the root of your project containing the following variables:

* `REACT_APP_API_URL`: The URL of your API
* `REACT_APP_AI_LOGO`: The URL of the AI logo

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Backend Setup

4. Open another terminal and navigate to the backend directory:
    ```
    cd pdf-chat-backend
    ```
## PDF Wizard Backend

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


