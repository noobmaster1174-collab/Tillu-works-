"""Database connection and session management."""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

# Primary database is PostgreSQL (Supabase), fallback to local SQLite for dev
DATABASE_URL = os.getenv("DATABASE_URL", "").strip()

# Handle standard Postgres URL if needed (Supabase usually provides postgresql://)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Ensure SSL is enabled for Supabase
if "supabase.co" in DATABASE_URL and "sslmode" not in DATABASE_URL:
    separator = "&" if "?" in DATABASE_URL else "?"
    DATABASE_URL += f"{separator}sslmode=require"

if not DATABASE_URL or DATABASE_URL == "":
    DATABASE_URL = "sqlite:///./tilluworks.db"

print(f"🔗 Connecting to: {DATABASE_URL.split('@')[-1] if '@' in DATABASE_URL else DATABASE_URL}")

engine = create_engine(
    DATABASE_URL, 
    # SQLite needs check_same_thread=False
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    # Better connection pooling for PostgreSQL
    pool_pre_ping=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """Dependency: yields a DB session, closes after request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
