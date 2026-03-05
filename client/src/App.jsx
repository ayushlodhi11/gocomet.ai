import './App.css';

export default function App() {
  return (
    <main>
      {/* Nav */}
      <nav>
        <span className="logo">GoComet<span className="accent">.</span>ai</span>
        <a href="mailto:hello@gocomet.ai" className="nav-cta">Get in touch</a>
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
          <a href="mailto:hello@gocomet.ai" className="btn-primary">Request early access</a>
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
        <a href="mailto:hello@gocomet.ai" className="btn-primary btn-large">
          Request early access
        </a>
      </section>

      {/* Footer */}
      <footer>
        <span>© {new Date().getFullYear()} GoComet AI — System of Outcomes</span>
      </footer>
    </main>
  );
}
