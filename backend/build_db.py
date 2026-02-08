from db import get_db

with get_db() as conn:
    with open("backend/sql/schema.sql") as f:
        conn.executescript(f.read())

    with open("backend/sql/seed.sql") as f:
        conn.executescript(f.read())

    with open("backend/sql/sync_market_prices.sql") as f:
        conn.executescript(f.read())
