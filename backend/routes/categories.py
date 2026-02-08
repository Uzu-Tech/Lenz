from fastapi import APIRouter, HTTPException

from ..calculate_metrics import calculate_all_metrics
from ..db import get_db

router = APIRouter()


@router.get("/")
def list_categories():
    conn = get_db()
    rows = conn.execute("SELECT * FROM categories").fetchall()

    package = []
    for row in rows:
        package.append(dict(row))
        category_id = row["id"]
        package[-1].update(calculate_all_metrics(category_id, conn))

    conn.close()
    return package


@router.get("/{category_id}")
def get_category(category_id: int):
    conn = get_db()

    # Get category info
    category = conn.execute(
        "SELECT * FROM categories WHERE id = ?", (category_id,)
    ).fetchone()

    if not category:
        conn.close()
        raise HTTPException(status_code=404, detail="Category not found")

    result = dict(category)

    # Add metrics
    result.update(calculate_all_metrics(category_id, conn))

    # Get related markets
    markets = conn.execute(
        "SELECT * FROM markets WHERE category_id = ?", (category_id,)
    ).fetchall()

    result["markets"] = [dict(m) for m in markets]

    conn.close()
    return result
