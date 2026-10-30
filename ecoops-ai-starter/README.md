# EcoOps AI — starter repository

Autonomous multimodal energy operations platform.

## Included in this starter
- React + Vite + TypeScript frontend
- FastAPI backend
- Meta Model API connection using the official OpenAI-compatible Responses API
- PostgreSQL via Docker Compose
- Deterministic evidence-risk scoring endpoint
- Environment-variable configuration

## Prerequisites
- Git
- Node.js 20+
- Python 3.11+
- Docker Desktop
- Meta Model API key

## 1. Configure environment

Copy `backend/.env.example` to `backend/.env` and add your Meta key:

```env
MODEL_API_KEY=your_key_here
```

Never put this key in the frontend or commit `backend/.env`.

## 2. Start PostgreSQL

From the repository root:

```bash
docker compose up -d db
```

## 3. Start the backend (Windows PowerShell)

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --port 8000
```

Edit `backend/.env` and add `MODEL_API_KEY`.

macOS/Linux activation:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Backend docs: http://localhost:8000/docs

## 4. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## 5. Verify the first milestone

1. Open http://localhost:8000/api/v1/health
2. Open http://localhost:8000/docs
3. In the frontend, click **Test Meta connection**.
4. Try `POST /api/v1/incidents/score` in Swagger with:

```json
{
  "visual": 90,
  "occupancy": 95,
  "meter": 82,
  "historical": 70
}
```

The scoring endpoint is deterministic prototype logic. Its weights are provisional and must be calibrated against real data before operational use.

## Initial build sequence

1. Confirm local app and Meta API connection.
2. Add SQLAlchemy models and Alembic migrations.
3. Implement organization/building/room/device/meter entities.
4. Add incident and evidence persistence.
5. Add Meta Spark investigation with strict structured output and tool allowlists.
6. Add SAM 3.1 image/video segmentation.
7. Add Muse Voice audio transcription.
8. Add approval workflow and simulated device actions.
9. Add before/after verification with meter data.
10. Add tenant isolation, audit logs, tests, deployment and demo.

## Hackathon integrity
Clearly label generated/synthetic telemetry and simulated device commands in the product and demo. Keep a dated record of all work created during the event and distinguish it from any pre-existing EcoPoints work.
