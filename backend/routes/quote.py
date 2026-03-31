import os
import json
import aiofiles
import random
import string
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional, List
from database import get_db
from models.quote import Quote
from email_service import send_quote_notification

router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def generate_tracking_id():
    chars = string.ascii_uppercase + string.digits
    return "TW-" + "".join(random.choices(chars, k=6))

@router.post("/quote", status_code=201)
async def create_quote(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    company: Optional[str] = Form(None),
    products: str = Form(...),        # JSON string
    quantities: Optional[str] = Form(None),  # JSON string
    requirements: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    """Accept quote form data, save to DB, send email notification."""
    # Parse JSON fields
    try:
        products_list = json.loads(products)
        quantities_dict = json.loads(quantities) if quantities else {}
    except json.JSONDecodeError:
        raise HTTPException(status_code=422, detail="Invalid products or quantities format")

    # Handle file upload
    file_path = None
    if file and file.filename:
        allowed_types = {"image/png", "image/jpeg", "application/pdf"}
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=422, detail="Only PNG, JPG, and PDF allowed")
        content = await file.read()
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="File too large")
        safe_name = f"{name.replace(' ', '_')}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, safe_name)
        async with aiofiles.open(file_path, "wb") as f:
            await f.write(content)

    # Save to database
    tracking_id = generate_tracking_id()
    quote = Quote(
        name=name,
        email=email,
        phone=phone,
        company=company,
        products=products_list,
        quantities=quantities_dict,
        requirements=requirements,
        file_path=file_path,
        tracking_id=tracking_id,
        status="pending"
    )
    db.add(quote)
    db.commit()
    db.refresh(quote)

    # Send emails
    send_quote_notification({
        "name": name, "email": email, "phone": phone,
        "company": company, "products": products_list,
        "quantities": quantities_dict, "requirements": requirements,
        "tracking_id": tracking_id
    })

    return {
        "id": quote.id, 
        "tracking_id": tracking_id, 
        "message": f"Quote submitted! Your tracking ID is {tracking_id}. Use it to check status."
    }

@router.get("/orders/{identifier}")
async def get_orders(identifier: str, db: Session = Depends(get_db)):
    """Fetch orders by email or tracking ID."""
    if "@" in identifier:
        quotes = db.query(Quote).filter(Quote.email == identifier).order_by(Quote.created_at.desc()).all()
    else:
        quotes = db.query(Quote).filter(Quote.tracking_id == identifier).all()
    
    if not quotes:
        raise HTTPException(status_code=404, detail="No orders found")
    
    return quotes
