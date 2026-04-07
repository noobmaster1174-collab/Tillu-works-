"""
Tillu Works — FastAPI Backend
Main application entry point.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import engine, Base

# Import models so they are registered with Base before table creation
import models.quote  # noqa
import models.contact  # noqa

from routes import quote, contact, products, admin



@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create all database tables on startup."""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created/verified")
    yield
    print("🛑 Shutting down Tillu Works API")


app = FastAPI(
    title="Tillu Works API",
    description="Backend API for Tillu Works custom printing business — Hyderabad",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend dev server and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://tilluworks.in",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers under /api prefix
app.include_router(quote.router, prefix="/api", tags=["Quote"])
app.include_router(contact.router, prefix="/api", tags=["Contact"])
app.include_router(products.router, prefix="/api", tags=["Products"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])



@app.get("/api/health", tags=["Health"])
def health_check():
    """Health check endpoint for Docker and monitoring."""
    return {"status": "ok", "service": "Tillu Works API", "version": "1.0.0"}


@app.get("/", tags=["Root"])
def root():
    return {"message": "Welcome to Tillu Works API 🖨️ — Your Brand, Beautifully Printed"}
