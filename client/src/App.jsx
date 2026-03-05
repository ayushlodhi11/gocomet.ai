import { useState } from 'react';
import './App.css';

function EarlyAccessModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', note: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {status === 'success' ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>You're on the list.</h3>
            <p>We'll reach out to <strong>{form.email}</strong> shortly.</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div className="modal-label">Early Access</div>
              <h3>Request early access</h3>
              <p>We're onboarding select enterprise logistics teams. Tell us about yourself.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Ayush Lodhi"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Work email</label>
                <input
                  type="email"
                  placeholder="ayush@company.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tell us about your logistics challenge <span className="optional">(optional)</span></label>
                <textarea
                  placeholder="We manage 500+ shipments/month across 12 countries and need to reduce procurement cycle time..."
                  value={form.note}
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  rows={4}
                />
              </div>

              {status === 'error' && (
                <div className="form-error">{errorMsg}</div>
              )}

              <button type="submit" className="btn-submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Request early access'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      {modalOpen && <EarlyAccessModal onClose={() => setModalOpen(false)} />}

      {/* Nav */}
      <nav>
        <span className="logo">GoComet<span className="accent">.</span>ai</span>
        <button className="nav-cta" onClick={() => setModalOpen(true)}>Get in touch</button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-label">GoComet 2030 — System of Outcomes</div>
        <h1>
          Freight shouldn't take<br />
          <span className="gradient-text">50 tools to run.</span>
        </h1>
        <p className="sub">
          GoComet replaces fragmented logistics stacks with a single managed layer
          that delivers guaranteed outcomes — not just software to configure.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => setModalOpen(true)}>Request early access</button>
          <a href="#outcomes" className="btn-ghost">See the model</a>
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats-bar">
        <div className="stat">
          <span className="stat-num">37–110</span>
          <span className="stat-label">SaaS tools per enterprise</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">70%</span>
          <span className="stat-label">of integrations slow operations</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">51%</span>
          <span className="stat-label">of IT workload consumed by integrations</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">Months</span>
          <span className="stat-label">average time to value — today</span>
        </div>
      </section>

      {/* The shift */}
      <section className="shift" id="outcomes">
        <div className="section-label">The Shift</div>
        <h2>From systems of record<br />to systems of outcomes.</h2>
        <p className="section-sub">
          Enterprise software evolved from storing data, to displaying it, to acting on it.
          GoComet is built for what comes next.
        </p>

        <div className="layers">
          <div className="layer layer-1">
            <div className="layer-tag">Layer 1</div>
            <div className="layer-name">Systems of Record</div>
            <div className="layer-desc">ERPs, TMS, WMS — data stored, rarely acted on</div>
          </div>
          <div className="layer-arrow">↓</div>
          <div className="layer layer-2">
            <div className="layer-tag">Layer 2</div>
            <div className="layer-name">Systems of Experience</div>
            <div className="layer-desc">Dashboards, portals, visibility tools — data seen, not automated</div>
          </div>
          <div className="layer-arrow">↓</div>
          <div className="layer layer-3 layer-active">
            <div className="layer-tag">Layer 3 — GoComet</div>
            <div className="layer-name">Systems of Outcomes</div>
            <div className="layer-desc">Workflows executed, decisions automated, results guaranteed</div>
          </div>
        </div>
      </section>

      {/* AOE section */}
      <section className="aoe">
        <div className="section-label">The Model</div>
        <h2>Autonomous Outcome Engineering</h2>
        <p className="section-sub">
          Every GoComet engagement pairs Forward Deployed Engineers with Client Growth Partners —
          delivery and growth tightly aligned from day one.
        </p>

        <div className="compare">
          <div className="compare-col">
            <div className="compare-head old">Traditional SaaS</div>
            <ul>
              <li>You configure it</li>
              <li>You integrate it</li>
              <li>You maintain it</li>
              <li>Months to see value</li>
              <li>20–40% automation</li>
              <li>Linear ops cost</li>
            </ul>
          </div>
          <div className="compare-col">
            <div className="compare-head new">GoComet Managed SaaS</div>
            <ul>
              <li>We deploy it end-to-end</li>
              <li>We own the integrations</li>
              <li>We evolve with you</li>
              <li>Weeks to first outcome</li>
              <li>60–90% automation</li>
              <li>Declining ops cost</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="outcomes-grid">
        <div className="section-label">What You Get</div>
        <h2>Outcomes, not features.</h2>

        <div className="outcome-cards">
          <div className="outcome-card">
            <div className="outcome-icon">⚡</div>
            <div className="outcome-metric">3× faster</div>
            <div className="outcome-title">Freight Procurement</div>
            <div className="outcome-desc">AI-driven RFQ, bid analysis, and award in hours — not weeks.</div>
          </div>
          <div className="outcome-card">
            <div className="outcome-icon">📄</div>
            <div className="outcome-metric">90%+ accuracy</div>
            <div className="outcome-title">Document Correctness</div>
            <div className="outcome-desc">Automated validation across BL, invoices, and customs docs at scale.</div>
          </div>
          <div className="outcome-card">
            <div className="outcome-icon">🔗</div>
            <div className="outcome-metric">Single layer</div>
            <div className="outcome-title">Supply Chain Visibility</div>
            <div className="outcome-desc">One orchestration layer replacing 30–50 point solutions.</div>
          </div>
          <div className="outcome-card">
            <div className="outcome-icon">📉</div>
            <div className="outcome-metric">Declining cost</div>
            <div className="outcome-title">Operations Cost</div>
            <div className="outcome-desc">Reusable workflows mean every new use case costs less than the last.</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Built for enterprise.<br />Priced on outcomes.</h2>
        <p>
          GoComet.ai is in early access. We're onboarding a select group of
          enterprise logistics teams to co-build the system of outcomes together.
        </p>
        <button className="btn-primary btn-large" onClick={() => setModalOpen(true)}>
          Request early access
        </button>
      </section>

      {/* Footer */}
      <footer>
        <span>© {new Date().getFullYear()} GoComet AI — System of Outcomes</span>
      </footer>
    </main>
  );
}
