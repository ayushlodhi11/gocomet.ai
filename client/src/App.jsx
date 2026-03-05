import './App.css';

export default function App() {
  return (
    <main>
      <nav>
        <span className="logo">GoComet<span className="accent">.</span>ai</span>
        <a href="mailto:hello@gocomet.ai" className="nav-cta">Get in touch</a>
      </nav>

      <section className="hero">
        <h1>Intelligent logistics,<br />reimagined.</h1>
        <p className="sub">
          GoComet.ai brings AI to freight procurement, contract management,
          and supply chain visibility — so your team moves faster with less friction.
        </p>
        <a href="mailto:hello@gocomet.ai" className="btn-primary">Request early access</a>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} GoComet AI</span>
      </footer>
    </main>
  );
}
