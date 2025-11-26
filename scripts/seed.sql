INSERT INTO categories (name) VALUES
('Cours'), ('TP'), ('Projet')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO users (name,email) VALUES
('Tsipora','tsipo@gmail.com'), ('essai','essai@essai.com')
ON DUPLICATE KEY UPDATE email=VALUES(email); 

INSERT INTO tags (name) VALUES
('Urgent'), ('important'), ('facile'), ('difficile')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO items (title, description, status, user_id, category_id) VALUES
('Réviser chapitre 1', 'Relire les notions principales du chapitre 1', 'DRAFT', 1, 1),
('TP Python', 'Compléter les exercices sur les fonctions', 'ACTIVE', 2, 2),
('Projet IA', 'Créer un mini chatbot utilisant TF-IDF', 'ACTIVE', 3, 3),
('Rédiger compte rendu', 'Compte rendu du TP sur les algorithmes', 'DRAFT', 1, 2),
('Préparer présentation', 'Présentation sur le projet final', 'ARCHIVED', 2, 3)
ON DUPLICATE KEY UPDATE title=VALUES(title);

INSERT INTO item_tags (item_id, tag_id) VALUES
(2,3), (2,4);
