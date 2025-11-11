const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * 1. Basic route
 */
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js example!');
});

/**
 * 2. Route parameters
 * Example: GET /users/101
 */
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID received: ${userId}`);
});

/**
 * 3. Query parameters
 * Example: GET /search?q=nodejs&page=2
 */
app.get('/search', (req, res) => {
  const query = req.query.q;
  const page = req.query.page || 1;
  res.send(`Search query: ${query}, Page: ${page}`);
});

/**
 * 4. POST request with JSON body
 * Example: POST /users  with { "name": "Alice" }
 */
app.post('/users', (req, res) => {
  const name = "sample";
  res.status(201).send(`User '${name}' created successfully!`);
});

/**
 * 5. URL building example
 * Using `req.baseUrl` and `req.path`
 */
app.get('/info', (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  res.send(`Full URL of this request: ${fullUrl}`);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
