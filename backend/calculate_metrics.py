"""
Calculate market metrics from price history data.
"""

import sqlite3
from datetime import datetime
from math import sqrt

from numpy import std


def get_sign(sentiment: str):
    return -1 if sentiment == "negative" else 1


def trend_idx(category_id: int, conn: sqlite3.Connection):
    markets = conn.execute(
        "SELECT * FROM markets WHERE category_id = ?", (category_id,)
    ).fetchall()

    numerator = 0
    weight_sum = 0
    for market in markets:
        sign = get_sign(market["sentiment"])
        participant_no = market["participant_no"]
        p = market["price"] / 100

        weight = sqrt(participant_no)
        numerator += weight * sign * (p - 0.5)
        weight_sum += weight

    if weight_sum == 0:
        return 0

    result = numerator / weight_sum
    return result * 200


def momentum(category_id: int, conn: sqlite3.Connection):
    rows = conn.execute(
        "SELECT trend_idx, momentum FROM closing_metrics WHERE category_id = ? ORDER BY id DESC LIMIT 2",
        (category_id,),
    ).fetchall()

    if not rows:
        return 0

    if len(rows) == 1:
        return rows[0]["momentum"]

    trend_idx_diff = rows[0]["trend_idx"] - rows[1]["trend_idx"]
    return 1 / 4 * trend_idx_diff + 3 / 4 * rows[0]["momentum"]


def stability(category_id: int, conn: sqlite3.Connection):
    rows = conn.execute(
        "SELECT trend_idx FROM closing_metrics WHERE category_id = ? ORDER BY id DESC LIMIT 30",
        (category_id,),
    ).fetchall()

    sigma = std([row["trend_idx"] for row in rows], ddof=1)
    return 100 - sigma


def proximity(category_id: int, conn: sqlite3.Connection):
    markets = conn.execute(
        "SELECT participant_no, end_date FROM markets WHERE category_id = ?",
        (category_id,),
    ).fetchall()

    proximity = 0
    weight_sum = 0
    for market in markets:
        participant_no = market["participant_no"]
        end_date = datetime.fromisoformat(market["end_date"])

        proximity_i = 100 / (7 + ((end_date - datetime.now()).days / 7))
        weight = sqrt(participant_no)
        weight_sum += weight
        proximity += weight * proximity_i

    return proximity / weight_sum


def urgency(category_id: int, conn: sqlite3.Connection):
    markets = conn.execute(
        "SELECT * FROM markets WHERE category_id = ?", (category_id,)
    ).fetchall()

    numerator = 0
    weight_sum = 0
    for market in markets:
        sign = get_sign(market["sentiment"])
        participant_no = market["participant_no"]
        p = market["price"] / 100
        end_date = datetime.fromisoformat(market["end_date"])

        days_remaining = (end_date - datetime.now()).days
        if days_remaining <= 0:
            days_remaining = 1  # Avoid division by zero

        weight = sqrt(participant_no)
        numerator += (weight * sign * (p - 0.5)) / days_remaining
        weight_sum += weight

    result = numerator / weight_sum
    return result * 200


def calculate_all_metrics(category_id: int, conn: sqlite3.Connection):
    """
    Calculate and return all five metrics for a category.

    Returns:
        Dict with keys: trend_idx, momentum, stability, proximity, urgency
    """
    return {
        "trend_idx": trend_idx(category_id, conn),
        "momentum": momentum(category_id, conn),
        "stability": stability(category_id, conn),
        "proximity": proximity(category_id, conn),
        "urgency": urgency(category_id, conn),
    }
