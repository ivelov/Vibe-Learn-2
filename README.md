# Vibe Learn 2

A web application built with FastAPI (backend) and Next.js (frontend).

## Prerequisites

- Python 3.11+
- Node.js 18+

## Setup

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in the required values before running.

## Development

| Service  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
