"""Contact API route — POST /api/contact."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.contact import Contact
from schemas.contact import ContactCreate
from email_service import send_contact_notification

router = APIRouter()


@router.post("/contact", status_code=201)
def create_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    """Save contact form submission and send email notification."""
    contact = Contact(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        message=payload.message,
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)

    send_contact_notification({
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "message": payload.message,
    })

    return {"id": contact.id, "message": "Message received! We'll be in touch shortly."}
