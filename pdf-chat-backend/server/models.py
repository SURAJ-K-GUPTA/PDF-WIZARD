from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .db import Base

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    content = Column(Text)  # Store parsed text content of PDF
    upload_date = Column(DateTime, default=func.now())

class ChatHistory(Base):
    __tablename__ = "chat_history"
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer)
    question = Column(Text)
    answer = Column(Text)
    timestamp = Column(DateTime, default=func.now())
