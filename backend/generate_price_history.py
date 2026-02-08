import random
from datetime import datetime, timedelta

from db import get_db

# Different volatility levels for each market (lower = more stable)
MARKET_VOLATILITIES = {
    1: 0.015,  # Y2K fashion - moderate volatility
    2: 0.012,  # Y2K aesthetic - lower volatility
    3: 0.025,  # Indie sleaze top 10 - higher volatility
    4: 0.020,  # Indie sleaze resurge - moderate-high
    5: 0.018,  # Stanley Cup peak - moderate
    6: 0.016,  # Stanley Cup top product - moderate
    7: 0.010,  # Coquette top 5 - very stable
    8: 0.011,  # Coquette fashion growth - very stable
    9: 0.022,  # Clean girl decline - moderate-high
    10: 0.019,  # Clean girl exit - moderate
    11: 0.014,  # Nostalgia core peak - moderate-low
    12: 0.013,  # Nostalgia aesthetic - moderate-low
}


def generate_random_walk(num_points, volatility):
    """
    Generate a random walk with small drift terms for organic price movement.

    Args:
        num_points: Number of data points to generate
        volatility: Standard deviation of random steps

    Returns:
        List of probabilities (0-1 scale as REAL)
    """
    # Start from a random price between 0.2 and 0.8
    current_prob = random.uniform(0.2, 0.8)

    # Generate a small random drift unique to this market
    drift = random.uniform(-0.0001, 0.0001)

    # Generate random walk with reduced variance
    prices = [current_prob]

    for i in range(1, num_points):
        # Scale down the random step for reduced day-to-day variance
        random_step = random.gauss(0, volatility / 2.0)

        # Add small drift term
        next_price = prices[-1] + random_step + drift
        # Clamp between 0.05 and 0.95 to keep realistic
        next_price = max(0.05, min(0.95, next_price))
        prices.append(next_price)

    return prices


def clear_price_history():
    """Clear existing probability history data"""
    conn = get_db()
    conn.execute("DELETE FROM price_history")
    conn.commit()
    conn.close()
    print("Cleared existing price history")


def generate_and_insert_prices():
    """Generate random walk prices for all markets and insert into database"""
    conn = get_db()
    cursor = conn.cursor()

    # Get all markets
    markets = cursor.execute("SELECT id, question, price FROM markets").fetchall()

    if not markets:
        print("No markets found in database!")
        conn.close()
        return

    # Calculate total data points: 2 months = 60 days * 24 hours * 6 ten-minute intervals per hour
    days = 60
    interval_minutes = 10
    intervals_per_hour = 60 // interval_minutes
    total_intervals = days * 24 * intervals_per_hour

    print(
        f"Generating {total_intervals} price points per market (2 months, 10-minute intervals)..."
    )

    total_inserted = 0

    for market_id, question, current_price in markets:
        print(f"Processing market {market_id}: {question}")

        # Get volatility for this market (default if not specified)
        volatility = MARKET_VOLATILITIES.get(market_id, 0.015)

        # Generate random walk (starts from random price)
        prices = generate_random_walk(total_intervals, volatility)

        # Generate timestamps going back 2 months, one per 10-minute interval
        now = datetime.now()

        # Prepare batch insert data
        price_data = []
        for i, price in enumerate(prices):
            # Calculate timestamp: start from 2 months ago, add i intervals
            timestamp = now - timedelta(
                minutes=total_intervals * interval_minutes - i * interval_minutes
            )
            # Store as REAL (0-1 scale) in probability_history
            price_data.append((market_id, price, timestamp.isoformat()))

        # Batch insert all prices for this market
        cursor.executemany(
            "INSERT INTO price_history (market_id, probability, timestamp) VALUES (?, ?, ?)",
            price_data,
        )

        total_inserted += len(price_data)

    conn.commit()
    conn.close()

    print(f"\nTotal prices inserted: {total_inserted}")
    print("Price history generation complete!")


if __name__ == "__main__":
    clear_price_history()
    generate_and_insert_prices()
