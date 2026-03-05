'use strict';

const express     = require('express');
const path        = require('path');
const compression = require('compression');
const helmet      = require('helmet');

const app  = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));

// Serve React build
app.use(express.static(path.join(__dirname, 'client/dist')));

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`gocomet.ai listening on port ${PORT}`);
});
