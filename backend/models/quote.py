"""SQLAlchemy model for quote submissions."""
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Float
from sqlalchemy.sql import func
from database import Base


class Quote(Base):
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(20), nullable=False)
    company = Column(String(200), nullable=True)
    
    # Store configurations (choices like Matte finish, Chip, etc.)
    metadata_info = Column(JSON, nullable=True) 
    
    products = Column(JSON, nullable=False)       # list of product IDs
    quantities = Column(JSON, nullable=True)      # dict {product_id: qty}
    
    requirements = Column(Text, nullable=True)
    
    # Files
    file_path = Column(String(500), nullable=True) # General/Legacy
    design_file_path = Column(String(500), nullable=True)
    data_file_path = Column(String(500), nullable=True)
    
    status = Column(String(50), default="pending") 
    total_price = Column(Float, default=0.0)
    
    tracking_id = Column(String(100), unique=True, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
