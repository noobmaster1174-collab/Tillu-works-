"""Pydantic schemas for quote endpoints."""
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict


class QuoteCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    products: List[str]
    quantities: Optional[Dict[str, str]] = None
    requirements: Optional[str] = None


class QuoteResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str = "Quote submitted successfully"

    class Config:
        from_attributes = True
