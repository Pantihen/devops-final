const express = require('express');
const { register, metricsMiddleware } = require('./metrics');

const app = express();

app.use(metricsMiddleware);

app.get('/', (req, res) => {
  res.type('text/plain').send('DevOps Final Project');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/metrics', async (req, res, next) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    next(err);
  }
});

module.exports = app;
