"""
Populate closing_metrics table with historical data for the last 30 days.
Only calculates trend_idx and momentum based on actual price_history data.
"""

from datetime import datetime, timedelta
from math import sqrt

from db import get_db


def get_sign(sentiment: str):
    return -1 if sentiment == "negative" else 1


def calculate_historical_trend_idx(category_id: int, target_date: str, conn):
    """
    Calculate trend_idx for a specific date using price_history data.
    """
    markets = conn.execute(
        "SELECT * FROM markets WHERE category_id = ?", (category_id,)
    ).fetchall()

    numerator = 0
    weight_sum = 0

    for market in markets:
        market_id = market["id"]
        sign = get_sign(market["sentiment"])
        participant_no = market["participant_no"]

        # Get the closing price for this market on the target date
        # Use the last price entry on or before the target date
        price_row = conn.execute(
            """SELECT probability FROM price_history 
               WHERE market_id = ? AND date(timestamp) <= date(?)
               ORDER BY timestamp DESC LIMIT 1""",
            (market_id, target_date),
        ).fetchone()

        if not price_row:
            continue

        p = price_row["probability"]

        weight = sqrt(participant_no)
        numerator += weight * sign * (p - 0.5)
        weight_sum += weight

    if weight_sum == 0:
        return 0

    result = numerator / weight_sum
    return result * 200


def populate_closing_metrics_for_category(category_id: int, days: int = 30):
    """
    Generate and insert closing metrics for a category for the last N days.
    """
    conn = get_db()

    print(f"Generating metrics for category {category_id} for last {days} days...")

    for day_offset in range(0, 30):
        # Calculate date
        metric_date = (datetime.now() - timedelta(days=day_offset)).date().isoformat()

        # Calculate trend_idx from actual price history
        historical_trend_idx = calculate_historical_trend_idx(
            category_id, metric_date, conn
        )

        # Calculate momentum (weighted average of trend_idx difference and previous momentum)
        if day_offset == days:
            # First day - momentum equals trend_idx
            historical_momentum = historical_trend_idx
        else:
            # Get previous day's values
            prev = conn.execute(
                """SELECT trend_idx, momentum FROM closing_metrics 
                   WHERE category_id = ? 
                   ORDER BY id DESC LIMIT 1""",
                (category_id,),
            ).fetchone()

            if prev:
                trend_idx_diff = historical_trend_idx - prev["trend_idx"]
                # Standard momentum calculation: 25% current diff + 75% previous
                historical_momentum = 0.25 * trend_idx_diff + 0.75 * prev["momentum"]
            else:
                historical_momentum = historical_trend_idx

        # Insert into database
        conn.execute(
            """INSERT INTO closing_metrics 
               (category_id, trend_idx, momentum, date) 
               VALUES (?, ?, ?, ?)""",
            (category_id, historical_trend_idx, historical_momentum, metric_date),
        )

    conn.commit()
    conn.close()
    print(f"✓ Inserted {days} days of metrics for category {category_id}")


def populate_all_categories(days: int = 30):
    """
    Populate closing metrics for all categories.
    """
    conn = get_db()

    # Clear existing data
    print("Clearing existing closing_metrics data...")
    conn.execute("DELETE FROM closing_metrics")
    conn.commit()

    # Get all categories
    categories = conn.execute("SELECT id, name FROM categories").fetchall()
    conn.close()

    print(f"\nPopulating metrics for {len(categories)} categories...")
    print("=" * 80)

    for category in categories:
        category_id = category["id"]
        category_name = category["name"]
        print(f"\nCategory: {category_name} (ID: {category_id})")

        try:
            populate_closing_metrics_for_category(category_id, days)
        except Exception as e:
            print(f"✗ Error for category {category_id}: {e}")
            import traceback

            traceback.print_exc()
            continue

    print("\n" + "=" * 80)
    print("✓ Done! Closing metrics populated.")


if __name__ == "__main__":
    # Populate 30 days of historical metrics for all categories
    populate_all_categories(days=30)

    # Verify the data
    conn = get_db()
    count = conn.execute("SELECT COUNT(*) FROM closing_metrics").fetchone()[0]
    print(f"\nTotal records in closing_metrics: {count}")

    # Show sample data
    print("\nSample data (most recent 5 entries):")
    samples = conn.execute(
        """SELECT cm.id, c.name, cm.trend_idx, cm.momentum, cm.date 
           FROM closing_metrics cm
           JOIN categories c ON cm.category_id = c.id
           ORDER BY cm.date DESC, cm.id DESC LIMIT 5"""
    ).fetchall()

    for sample in samples:
        print(
            f"  {sample['date']} - {sample['name']}: "
            f"trend_idx={sample['trend_idx']:.2f}, momentum={sample['momentum']:.2f}"
        )

    conn.close()
