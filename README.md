# Tillu Works 🖨️

> **Your Brand, Beautifully Printed** — Custom printing & branding solutions from Hyderabad, India.

A complete, production-ready full-stack website for Tillu Works, a custom printing business specializing in ID cards, laser water bottles, printed mugs, pens, keychains, and diaries.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite, TailwindCSS v4, Framer Motion |
| Backend | Python 3.11, FastAPI, SQLAlchemy |
| Database | PostgreSQL 15 |
| Deployment | Docker Compose |

---

## Project Structure

```
Tillu-works-/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # Navbar, Footer, ProductCard, etc.
│   │   ├── pages/          # Home, Products, Gallery, Quote, Contact, About
│   │   └── data/           # Product data
│   ├── .env                # Frontend env vars
│   └── Dockerfile
├── backend/                # FastAPI app
│   ├── routes/             # quote.py, contact.py, products.py
│   ├── models/             # SQLAlchemy models
│   ├── schemas/            # Pydantic schemas
│   ├── main.py
│   ├── database.py
│   ├── email_service.py
│   ├── .env                # Backend env vars
│   └── Dockerfile
└── docker-compose.yml
```

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL 15+ (or use Docker)

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### 2. Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt

# Configure environment
cp .env .env.local
# Edit .env with your PostgreSQL and SMTP credentials

uvicorn main:app --reload --port 8000
# Runs on http://localhost:8000
# API docs at http://localhost:8000/docs
```

### 3. Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WHATSAPP_NUMBER=91XXXXXXXXXX   # Replace with real number
```

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://tillu:tillu123@localhost:5432/tilluworks
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=yourapppassword            # Use Gmail App Password
OWNER_EMAIL=tilluworks@gmail.com
```

> **Gmail Setup**: Enable 2FA on your Google account → Create an App Password → Use that as `SMTP_PASS`.

---

## Docker Deployment

Run all 3 services (frontend, backend, PostgreSQL) with one command:

```bash
# From project root
docker-compose up --build

# Frontend → http://localhost:3000
# Backend  → http://localhost:8000
# API Docs → http://localhost:8000/docs
```

Tear down:
```bash
docker-compose down -v   # -v also removes volumes
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List all 6 products |
| POST | `/api/quote` | Submit quote request (multipart) |
| POST | `/api/contact` | Submit contact form |

Full interactive docs available at `http://localhost:8000/docs` (Swagger UI).

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, features, products, testimonials |
| `/products` | All 6 products with quote modal |
| `/gallery` | Masonry gallery with filter & lightbox |
| `/quote` | 3-step quote form |
| `/contact` | Contact form + map |
| `/about` | Brand story, values, team |

---

## Customization Checklist

- [ ] Replace `91XXXXXXXXXX` in `frontend/.env` and `frontend/src/components/WhatsAppFloat.jsx` with your real WhatsApp number
- [ ] Update address in `Footer.jsx` and `Contact.jsx`
- [ ] Add real SMTP credentials in `backend/.env`
- [ ] Replace placeholder phone `+91 99999 99999` in `Navbar.jsx`, `Footer.jsx`, `Contact.jsx`
- [ ] Update Google Maps iframe in `Contact.jsx` with your actual location
- [ ] Add real product photos by updating image URLs in `frontend/src/data/products.js`

---

## License

© 2024 Tillu Works, Hyderabad. All rights reserved.
