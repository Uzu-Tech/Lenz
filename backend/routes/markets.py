from datetime import datetime

from fastapi import APIRouter

from ..db import get_db

router = APIRouter()


@router.get("/")
def get_markets():
    conn = get_db()
    markets = conn.execute(
        """--sql
        SELECT 
            m.id,
            m.question,
            m.category_id,
            c.name as category,
            m.price,
            m.volume,
            m.participant_no,
            m.sentiment,
            m.end_date
        FROM markets m
        LEFT JOIN categories c ON m.category_id = c.id
    """
    ).fetchall()
    conn.close()

    result = []
    for market in markets:
        market_dict = dict(market)
        # Calculate time remaining in days
        end_date = datetime.fromisoformat(market_dict["end_date"])
        now = datetime.now()
        days_remaining = (end_date - now).days
        market_dict["days_remaining"] = days_remaining
        result.append(market_dict)

    return result


@router.get("/{id}")
def get_market_detail(id: int):
    conn = get_db()
    # Get market details with category
    market_row = conn.execute(
        """
        SELECT 
            m.id,
            m.question,
            m.category_id,
            c.name as category,
            m.price,
            m.volume,
            m.participant_no,
            m.sentiment,
            m.end_date
        FROM markets m
        LEFT JOIN categories c ON m.category_id = c.id
        WHERE m.id = ?
    """,
        (id,),
    ).fetchone()

    if not market_row:
        return {"error": "Market not found"}

    # Get all price history
    price_history = conn.execute(
        "SELECT probability, timestamp FROM price_history WHERE market_id = ? ORDER BY timestamp ASC",
        (id,),
    ).fetchall()

    conn.close()

    # Calculate days remaining
    end_date = datetime.fromisoformat(market_row["end_date"])
    now = datetime.now()
    days_remaining = (end_date - now).days

    return {
        "id": market_row["id"],
        "question": market_row["question"],
        "category_id": market_row["category_id"],
        "category": market_row["category"],
        "price": market_row["price"],
        "volume": market_row["volume"],
        "participant_no": market_row["participant_no"],
        "sentiment": market_row["sentiment"],
        "end_date": market_row["end_date"],
        "days_remaining": days_remaining,
        "price_history": [
            {"probability": row["probability"], "timestamp": row["timestamp"]}
            for row in price_history
        ],
    }


@router.post("/{id}/trade")
def trade_market(id: int, action: str, outcome: str, amount: float):
    """
    Execute a trade on a market.

    Args:
        id: Market ID
        action: 'buy' or 'sell'
        outcome: 'yes' or 'no'
        amount: Trade amount in pounds
    """
    conn = get_db()

    # Get current market
    market = conn.execute(
        "SELECT id, price, volume, participant_no FROM markets WHERE id = ?", (id,)
    ).fetchone()

    if not market:
        conn.close()
        return {"error": "Market not found"}

    current_price = market["price"]
    current_volume = market["volume"]
    current_participants = market["participant_no"]
    amount_pence = int(amount * 100)  # Convert pounds to pence

    # Calculate price movement based on action and outcome
    # Buy YES: price increases, Buy NO: price decreases
    # Sell YES: price decreases, Sell NO: price increases
    price_impact = amount_pence / 100000  # Scale factor for price impact

    if action == "buy":
        if outcome == "yes":
            new_price = min(100, current_price + price_impact)  # Cap at 100
        else:  # outcome == "no"
            new_price = max(0, current_price - price_impact)  # Floor at 0
    else:  # action == "sell"
        if outcome == "yes":
            new_price = max(0, current_price - price_impact)  # Floor at 0
        else:  # outcome == "no"
            new_price = min(100, current_price + price_impact)  # Cap at 100

    new_volume = current_volume + amount_pence
    new_participants = current_participants + 1

    # Update market with new price and volume
    conn.execute(
        "UPDATE markets SET price = ?, volume = ?, participant_no = ? WHERE id = ?",
        (new_price, new_volume, new_participants, id),
    )

    # Add to price history
    now = datetime.now().isoformat()
    probability = new_price / 100  # Convert price (0-100) to probability (0-1)

    conn.execute(
        "INSERT INTO price_history (market_id, probability, timestamp) VALUES (?, ?, ?)",
        (id, probability, now),
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "market_id": id,
        "action": action,
        "outcome": outcome,
        "amount": amount,
        "old_price": current_price,
        "new_price": new_price,
        "new_volume": new_volume,
        "new_participants": new_participants,
        "timestamp": now,
    }
