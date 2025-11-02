INSERT INTO categories (name) VALUES
('Cours'), ('TP'), ('Projet')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO users (name,email) VALUES
('Tsipora','tsipo@gmail.com'), ('essai','essai@essai.com')
ON DUPLICATE KEY UPDATE email=VALUES(email); 