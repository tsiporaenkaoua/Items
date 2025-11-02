# Starter TP — MVC Express + MySQL (UN SEUL EXEMPLE)

Ce starter fournit **UN exemple complet** (catégories) : API CRUD + formulaires + tests.
Les autres entités (**users, items, tags**) sont **à implémenter par les élèves**.

## Démarrage
```bash
cp .env.example .env  # configurez MySQL 
npm install
npm run db:setup
npm run db:seed
npm start
# Formulaires: http://localhost:3000/categories
# Swagger: http://localhost:3000/docs
```

## À faire (élèves)
- Dupliquez `categoriesController.js` vers `usersController.js`, `itemsController.js`, `tagsController.js` et adaptez SQL.
- Branchez les routes API et Web correspondantes (voir `src/routes`).
- Créez les vues EJS pour users/items/tags en copiant celles des catégories.
- Ajoutez les tests CRUD pour chaque ressource dans `tests/`.
- Mettez à jour `docs/openapi.yaml` (schemas + paths) pour users/items/tags.

Bon TP ✨
