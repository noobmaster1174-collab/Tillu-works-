"""Products API route — GET /api/products."""
from fastapi import APIRouter

router = APIRouter()

PRODUCTS = [
    {
        "id": "id-cards",
        "name": "ID Cards",
        "category": "ID Cards",
        "shortDesc": "PVC & paper ID cards with custom design, lanyards available",
        "price": "₹15/card",
        "startingPrice": 15,
        "unit": "card",
        "minQty": 50,
        "icon": "🪪",
        "features": ["Full-color printing", "PVC or paper options", "Lanyards available", "Same-day delivery"],
    },
    {
        "id": "water-bottles",
        "name": "Laser Water Bottles",
        "category": "Bottles",
        "shortDesc": "Stainless steel bottles with laser-engraved logos",
        "price": "₹299/bottle",
        "startingPrice": 299,
        "unit": "bottle",
        "minQty": 10,
        "icon": "🍶",
        "features": ["Laser precision engraving", "BPA-free stainless steel", "Temperature retention", "Bulk discounts"],
    },
    {
        "id": "mugs",
        "name": "Printed Mugs",
        "category": "Mugs",
        "shortDesc": "Ceramic mugs with full-color sublimation printing",
        "price": "₹199/mug",
        "startingPrice": 199,
        "unit": "mug",
        "minQty": 12,
        "icon": "☕",
        "features": ["Sublimation printing", "Dishwasher safe", "Fade resistant", "Custom packaging"],
    },
    {
        "id": "pens",
        "name": "Printed Pens",
        "category": "Pens",
        "shortDesc": "Metal & plastic pens with logo printing",
        "price": "₹25/pen",
        "startingPrice": 25,
        "unit": "pen",
        "minQty": 100,
        "icon": "✒️",
        "features": ["Metal & plastic options", "Multiple finishes", "Smooth writing", "Low minimum order"],
    },
    {
        "id": "keychains",
        "name": "Printed Keychains",
        "category": "Keychains",
        "shortDesc": "Metal & acrylic keychains with custom design",
        "price": "₹30/keychain",
        "startingPrice": 30,
        "unit": "keychain",
        "minQty": 50,
        "icon": "🔑",
        "features": ["Metal & acrylic options", "Custom shapes", "Engraving or printing", "Quick turnaround"],
    },
    {
        "id": "diaries",
        "name": "Custom Diaries",
        "category": "Diaries",
        "shortDesc": "Custom printed diaries with logo cover, A5/A4 sizes",
        "price": "₹149/diary",
        "startingPrice": 149,
        "unit": "diary",
        "minQty": 25,
        "icon": "📔",
        "features": ["A4 & A5 sizes", "Hardbound & spiral options", "Premium paper", "Full-cover branding"],
    },
]


@router.get("/products")
def get_products():
    """Return all available products."""
    return {"products": PRODUCTS, "count": len(PRODUCTS)}
