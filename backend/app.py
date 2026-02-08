from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.categories import router as category_router
from .routes.markets import router as market_router

app = FastAPI(title="Lens API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with prefixes
app.include_router(category_router, prefix="/api/categories", tags=["categories"])
app.include_router(market_router, prefix="/api/markets", tags=["markets"])


@app.get("/")
def home():
    return {"status": "API A OKay"}
