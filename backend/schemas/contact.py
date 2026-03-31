"""Pydantic schemas for contact endpoints."""
from pydantic import BaseModel, EmailStr


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str


class ContactResponse(BaseModel):
    id: int
    name: str
    message: str = "Message sent successfully"

    class Config:
        from_attributes = True
