const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

try {
  const openapi = YAML.load(path.join(__dirname, '..', 'docs', 'openapi.yaml'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));
} catch (e) { console.warn('Swagger non chargé'); }

app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.use((req, res) => res.status(404).send('Not found'));

module.exports = app;
