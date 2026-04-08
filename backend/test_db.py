import os
from database import SessionLocal
from models.quote import Quote
import json

db = SessionLocal()
quotes = db.query(Quote).all()

with open("output.txt", "w", encoding="utf-8") as f:
    for q in quotes:
        f.write(f"--- Quote ID {q.id} ---\n")
        f.write(f"products: {type(q.products)} {q.products}\n")
        f.write(f"quantities: {type(q.quantities)} {q.quantities}\n")
        f.write(f"metadata_info: {type(q.metadata_info)} {q.metadata_info}\n")
        f.write(f"requirements: {type(q.requirements)} {q.requirements}\n\n")

db.close()
