from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from database import get_db
from models.quote import Quote
from dependencies import get_current_admin
from sqlalchemy import desc

router = APIRouter()

@router.get("/quotes")
def get_all_quotes(
    admin_info: dict = Depends(get_current_admin), 
    db: Session = Depends(get_db)
):
    """
    Fetch all quotes (orders) for the admin dashboard.
    Protected to only allow the OWNER_EMAIL to view this.
    """
    quotes = db.query(Quote).order_by(desc(Quote.created_at)).all()
    return {"status": "success", "data": quotes}

@router.patch("/quotes/{quote_id}/status")
def update_quote_status(
    quote_id: int,
    status: str = Body(..., embed=True),
    admin_info: dict = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Update the status of a specific order/quote."""
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Order not found")
    
    quote.status = status
    db.commit()
    return {"status": "success", "message": f"Order #{quote_id} marked as {status}"}
