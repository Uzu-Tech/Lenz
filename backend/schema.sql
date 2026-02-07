CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE markets (
    id INTEGER PRIMARY KEY,
    category_id INTEGER,
    question TEXT NOT NULL,
    price REAL,
    volume REAL,
    participant_no INTEGER,
    time_remaining INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE price_history (
    id INTEGER PRIMARY KEY,
    market_id INTEGER,
    probability REAL,
    timestamp TEXT,
    FOREIGN KEY (market_id) REFERENCES markets(id)
);