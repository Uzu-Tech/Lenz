import sqlite3

DB_PATH = "backend/data/app.db"

# This allows us to use sql via py
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

