'use strict';

const express     = require('express');
const path        = require('path');
const compression = require('compression');
const helmet      = require('helmet');

const app  = express();
const PORT = process.env.PORT || 8080;
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;

app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());

// Serve React build
app.use(express.static(path.join(__dirname, 'client/dist')));

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Early access form
app.post('/api/early-access', async (req, res) => {
  const { name, email, note } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  if (!SLACK_WEBHOOK) {
    console.error('SLACK_WEBHOOK_URL not set');
    return res.status(500).json({ error: 'Server misconfiguration.' });
  }

  const message = {
    text: `🚀 *New Early Access Request*`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '🚀 New Early Access Request', emoji: true }
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${name}` },
          { type: 'mrkdwn', text: `*Email:*\n${email}` },
        ]
      },
      ...(note ? [{
        type: 'section',
        text: { type: 'mrkdwn', text: `*Note:*\n${note}` }
      }] : []),
      {
        type: 'context',
        elements: [{ type: 'mrkdwn', text: `Submitted via gocomet.ai • ${new Date().toUTCString()}` }]
      }
    ]
  };

  try {
    const response = await fetch(SLACK_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    if (!response.ok) throw new Error(`Slack responded ${response.status}`);
    res.json({ ok: true });
  } catch (err) {
    console.error('Slack error:', err.message);
    res.status(502).json({ error: 'Failed to send notification.' });
  }
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`gocomet.ai listening on port ${PORT}`);
});
