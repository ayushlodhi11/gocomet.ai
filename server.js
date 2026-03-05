'use strict';

const express     = require('express');
const path        = require('path');
const compression = require('compression');
const helmet      = require('helmet');

const app  = express();
const PORT = process.env.PORT || 8080;

// Load Slack webhook — env var in dev, Secret Manager in prod
let slackWebhook = process.env.SLACK_WEBHOOK_URL || null;

async function loadSecrets() {
  if (slackWebhook || process.env.NODE_ENV !== 'production') return;
  try {
    const tokenRes = await fetch(
      'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
      { headers: { 'Metadata-Flavor': 'Google' } }
    );
    const { access_token } = await tokenRes.json();
    const secretRes = await fetch(
      'https://secretmanager.googleapis.com/v1/projects/gocomet-ai/secrets/GOCOMET_SLACK_WEBHOOK/versions/latest:access',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    const { payload } = await secretRes.json();
    slackWebhook = Buffer.from(payload.data, 'base64').toString();
  } catch (err) {
    console.error('Failed to load secrets:', err.message);
  }
}

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

  if (!slackWebhook) {
    console.error('Slack webhook not configured');
    return res.status(500).json({ error: 'Server misconfiguration.' });
  }

  const message = {
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
    const response = await fetch(slackWebhook, {
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

loadSecrets().then(() => {
  app.listen(PORT, () => console.log(`gocomet.ai listening on port ${PORT}`));
});
