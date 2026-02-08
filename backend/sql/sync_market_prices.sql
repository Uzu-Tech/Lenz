-- Sync market prices with the most recent probability from price history
-- Updates each market's price column to match the latest entry in probability_history

UPDATE markets
SET price = (
    SELECT ROUND(probability * 100)
    FROM price_history
    WHERE market_id = markets.id
    ORDER BY timestamp DESC
    LIMIT 1
)
WHERE id IN (
    SELECT DISTINCT market_id FROM price_history
);
