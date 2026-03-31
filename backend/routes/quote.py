"""Quote API route — POST /api/quote."""
import os
import json
import aiofiles
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
from models.quote import Quote
from email_service import send_quote_notification

router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


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
        # Validate file type and size (5MB)
        allowed_types = {"image/png", "image/jpeg", "application/pdf"}
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=422, detail="Only PNG, JPG, and PDF files are allowed")
        content = await file.read()
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="File must be under 5MB")
        safe_name = f"{name.replace(' ', '_')}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, safe_name)
        async with aiofiles.open(file_path, "wb") as f:
            await f.write(content)

    # Save to database
    quote = Quote(
        name=name,
        email=email,
        phone=phone,
        company=company,
        products=products_list,
        quantities=quantities_dict,
        requirements=requirements,
        file_path=file_path,
    )
    db.add(quote)
    db.commit()
    db.refresh(quote)

    # Send emails asynchronously (non-blocking)
    send_quote_notification({
        "name": name, "email": email, "phone": phone,
        "company": company, "products": products_list,
        "quantities": quantities_dict, "requirements": requirements,
    })

    return {"id": quote.id, "message": "Quote submitted successfully. We'll contact you within 2 hours!"}
