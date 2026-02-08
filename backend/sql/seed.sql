INSERT INTO categories (name, description) VALUES
('Y2K Revival',
	'The resurgence of early 2000s aesthetic, fashion, and cultural elements '
	|| 'in contemporary media and consumer products.'),
('Indie Sleaze',
	'A nostalgic revival of independent culture, DIY aesthetics, and scrappy '
	|| 'creative approaches from the 2000s indie scene.'),
('Stanley Cup Craze',
	'Stanley Cup Craze is a trending cultural phenomenon gaining attention '
	|| 'in content creation and media.'),
('Coquette Aesthetic',
	'Coquette Aesthetic is a trending cultural phenomenon gaining attention '
	|| 'in content creation and media.'),
('Clean Girl 2.0',
	'Clean Girl 2.0 is a trending cultural phenomenon gaining attention '
	|| 'in content creation and media.'),
('Nostalgia Core',
	'Nostalgia Core is a trending cultural phenomenon gaining attention '
	|| 'in content creation and media.');

INSERT INTO markets (question, category_id, sentiment, price, volume, participant_no, end_date) VALUES
('Will Y2K fashion dominate Q2?', 1, 'positive', 72, 2400000, 1200, datetime('now', '+14 days')),
('Y2K aesthetic top social trend?', 1, 'positive', 68, 1800000, 900, datetime('now', '+14 days')),
('Indie sleaze revival in top 10?', 2, 'positive', 45, 1200000, 600, datetime('now', '+21 days')),
('Will indie sleaze resurge by 2026?', 2, 'positive', 35, 900000, 450, datetime('now', '+21 days')),
('Stanley Cup trend peak by summer?', 3, 'positive', 82, 3100000, 1500, datetime('now', '+7 days')),
('Stanley Cup top product Q2?', 3, 'positive', 78, 2800000, 1400, datetime('now', '+7 days')),
('Coquette aesthetic in top 5?', 4, 'positive', 61, 890000, 400, datetime('now', '+28 days')),
('Coquette fashion growth by 2026?', 4, 'positive', 59, 850000, 380, datetime('now', '+28 days')),
('Clean girl aesthetic decline?', 5, 'negative', 52, 1100000, 550, datetime('now', '+14 days')),
('Clean girl aesthetic exit top trends?', 5, 'negative', 58, 1050000, 520, datetime('now', '+14 days')),
('Nostalgia core trend peak by summer?', 6, 'positive', 71, 1300000, 650, datetime('now', '+10 days')),
('Nostalgia aesthetic dominates Q2?', 6, 'positive', 69, 1250000, 620, datetime('now', '+10 days'));