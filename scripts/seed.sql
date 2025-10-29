INSERT INTO categories (name) VALUES
('Cours'), ('TP'), ('Projet')
ON DUPLICATE KEY UPDATE name=VALUES(name);
