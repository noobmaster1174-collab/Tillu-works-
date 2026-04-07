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
    metadata_info: Optional[str] = Form(None), # New JSON metadata
    total_price: Optional[float] = Form(0.0), # New total price
    file: Optional[UploadFile] = File(None),   # Legacy / Combined
    design_file: Optional[UploadFile] = File(None), # ID Card Design
    data_file: Optional[UploadFile] = File(None),   # ID Card Data (Excel/CSV)
    db: Session = Depends(get_db),
):
    """Accept quote form data, save to DB, handle multiple files."""
    # Parse JSON fields
    try:
        products_list = json.loads(products)
        quantities_dict = json.loads(quantities) if quantities else {}
        meta_dict = json.loads(metadata_info) if metadata_info else {}
    except json.JSONDecodeError:
        raise HTTPException(status_code=422, detail="Invalid JSON format in products, quantities, or metadata")

    # Helper for saving files
    async def save_uploaded_file(upload_file: Optional[UploadFile], prefix: str):
        if not upload_file or not upload_file.filename:
            return None
        # Basic type checking
        content = await upload_file.read()
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(status_code=413, detail=f"{prefix} file too large")
        
        safe_name = f"{prefix}_{random.randint(1000,9999)}_{upload_file.filename.replace(' ', '_')}"
        file_path = os.path.join(UPLOAD_DIR, safe_name)
        async with aiofiles.open(file_path, "wb") as f:
            await f.write(content)
        return file_path

    legacy_path = await save_uploaded_file(file, "general")
    design_path = await save_uploaded_file(design_file, "design")
    data_path = await save_uploaded_file(data_file, "data")

    # Save to database
    tracking_id = generate_tracking_id()
    new_quote = Quote(
        name=name,
        email=email,
        phone=phone,
        company=company,
        products=products_list,
        quantities=quantities_dict,
        metadata_info=meta_dict,
        total_price=total_price,
        requirements=requirements,
        file_path=legacy_path,
        design_file_path=design_path,
        data_file_path=data_path,
        tracking_id=tracking_id,
        status="pending"
    )
    db.add(new_quote)
    db.commit()
    db.refresh(new_quote)

    # Send emails (using simplified notification)
    send_quote_notification({
        "name": name, "email": email, "phone": phone,
        "company": company, "products": products_list,
        "quantities": quantities_dict, "requirements": requirements,
        "tracking_id": tracking_id
    })

    return {
        "id": new_quote.id, 
        "tracking_id": tracking_id, 
        "message": f"Order submitted! Tracking ID: {tracking_id}."
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
