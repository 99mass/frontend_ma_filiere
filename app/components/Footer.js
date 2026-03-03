"use client";

export default function Footer() {
  const EMAIL = "sambadiop161@gmail.com";
  // Format for WhatsApp API: no spaces, no '+'
  const WHATSAPP = "221771169551";
  const LINKEDIN = "https://www.linkedin.com/in/samba-diop-021ab2202/";

  return (
    <footer className="footer print-hidden">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <h3 className="footer-logo">
              MaFilière<span>.</span>
            </h3>
            <p className="footer-desc">
              Plateforme gratuite <strong>de suggestion</strong> pour aider les
              nouveaux bacheliers sénégalais à découvrir les filières qui
              correspondent le mieux à leur profil selon les données de
              Campusen.
            </p>
          </div>

          {/* Quick Links / Contact Col */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Restons en contact</h4>
            <div className="social-links">
              <button
                onClick={() =>
                  window.dispatchEvent(new Event("openCoffeeModal"))
                }
                className="social-btn"
                style={{
                  border: "1.5px solid #d97706",
                  color: "#f59e0b",
                  background: "rgba(245,158,11,0.08)",
                }}
                title="Soutenir l'initiative"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>Soutenir le projet</span>
              </button>
              <a
                href={`mailto:${EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="Nous écrire par email"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn whatsapp"
                title="Contacter sur WhatsApp"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>WhatsApp</span>
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn linkedin"
                title="Samba Diop sur LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} MaFilière. Fait avec passion pour
            l&#39;éducation au Sénégal.
          </p>
        </div>
      </div>
    </footer>
  );
}
