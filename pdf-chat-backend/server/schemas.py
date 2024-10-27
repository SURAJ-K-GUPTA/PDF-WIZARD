from pydantic import BaseModel
from typing import Optional

class QuestionRequest(BaseModel):
    question: str
    file_name: str
    better_answer: Optional[bool] = False
class UploadResponse(BaseModel):
    filename: str
