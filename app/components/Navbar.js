"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const PHONE = "+221 77 116 95 51";

const IconCoffee = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const IconCopy = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const IconHeart = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconPhone = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [coffeeOpen, setCoffeeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const links = [];

  function copyPhone() {
    navigator.clipboard.writeText(PHONE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  useEffect(() => {
    const handleOpenModal = () => setCoffeeOpen(true);
    window.addEventListener("openCoffeeModal", handleOpenModal);
    return () => window.removeEventListener("openCoffeeModal", handleOpenModal);
  }, []);

  return (
    <>
      <div className="floatnav-wrapper">
        <nav className="floatnav">
          <Link href="/" className="floatnav-brand">
            {/* <Image
              src="/logo.png"
              alt="MaFilière"
              width={32}
              height={32}
              style={{ height: 32, width: "auto" }}
            /> */}
            <span>MaFilière</span>
          </Link>

          <ul className={`floatnav-links${open ? " open" : ""}`}>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={pathname === l.href ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Buy a Coffee */}
            <button
              onClick={() => setCoffeeOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 0.9rem",
                borderRadius: "var(--r-full)",
                border: "1.5px solid #f59e0b",
                background: "rgba(245,158,11,0.08)",
                color: "#d97706",
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "var(--transition)",
                fontFamily: "inherit",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(245,158,11,0.15)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(245,158,11,0.08)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <IconHeart /> Soutenir le projet
            </button>
          </div>
        </nav>
      </div>

      {/* MODAL DON */}
      {coffeeOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setCoffeeOpen(false);
          }}
        >
          <div
            style={{
              background: "var(--surface)",
              borderRadius: "var(--r-2xl)",
              padding: "2rem",
              maxWidth: 440,
              width: "100%",
              boxShadow: "var(--shadow-xl)",
              position: "relative",
              border: "1px solid var(--border)",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setCoffeeOpen(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--muted)",
                display: "flex",
              }}
            >
              <IconX />
            </button>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(245,158,11,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.75rem",
                  border: "2px solid rgba(245,158,11,0.3)",
                  color: "#d97706",
                }}
              >
                <IconHeart />
              </div>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: "var(--text)",
                  marginBottom: "0.4rem",
                }}
              >
                Soutenir l&#39;initiative
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                }}
              >
                MaFilière est une solution <strong>100% gratuite</strong> dédiée
                à l&#39;orientation des bacheliers. Votre soutien contribue
                directement aux frais d&#39;hébergement et au développement de
                nouvelles fonctionnalités.
              </p>
            </div>

            {/* Numéro copiable */}
            <div
              style={{
                background: "var(--bg)",
                border: "1.5px solid var(--border-2)",
                borderRadius: "var(--r-lg)",
                padding: "1rem 1.25rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <IconPhone /> Numéro de contact
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {PHONE}
                </span>
                <button
                  onClick={copyPhone}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.4rem 0.75rem",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--border-2)",
                    background: copied ? "var(--green-dim)" : "var(--surface)",
                    color: copied ? "var(--green)" : "var(--text-2)",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    transition: "var(--transition)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {copied ? (
                    <>
                      <IconCheck /> Copié !
                    </>
                  ) : (
                    <>
                      <IconCopy /> Copier
                    </>
                  )}
                </button>
              </div>

              {/* Text indication */}
              <div
                style={{
                  marginTop: "0.85rem",
                  paddingTop: "0.6rem",
                  borderTop: "1px dashed var(--border-2)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text)",
                    lineHeight: 1.5,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  Vous pouvez nous soutenir via <strong>Wave</strong> ou{" "}
                  <strong>Orange Money</strong> à ce numéro.
                </p>
              </div>
            </div>

            {/* Message final */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.6rem",
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "var(--r-lg)",
                padding: "0.85rem 1rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-2)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Pour toute proposition de partenariat ou suggestion
                d&#39;amélioration, n&#39;hésitez pas à nous contacter via ce
                numéro.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
