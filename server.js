// Main server file for the Node.js application
require('dotenv').config(); // Load environment variablesconst express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const dbUri = process.env.MONGODB_URI;

// Swagger definition
const swaggerDocument = YAML.load('./swagger.yaml');

// Import custom modules
const routes = require('./routes');
const { errorHandler } = require('./middleware');

// Middleware setup
app.use(bodyParser.json());
app.use(require('./middleware').logger);

// Routes setup
app.use('/', routes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global Error Handling Middleware
app.use(errorHandler);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
});

module.exports = server;