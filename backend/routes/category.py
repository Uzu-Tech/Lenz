from fastapi import APIRouter 
from backend.db import get_db

router = APIRouter()

@router.get("/categories")
def list_categories():
    conn = get_db()
    rows = conn.execute("SELECT * FROM categories").fetchall()
    conn.close()
    return [dict(r) for r in rows]
