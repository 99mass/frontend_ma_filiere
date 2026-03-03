"use client";
import { useState, useEffect } from "react";
import { login, getUniversites } from "../lib/api";

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dashboard state
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Check for existing token
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("admin_token")
        : null;
    if (saved) {
      setToken(saved);
      loadStats();
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(email, password);
      const t = res.data?.token || res.token;
      if (t) {
        localStorage.setItem("admin_token", t);
        setToken(t);
        loadStats();
      } else {
        setError("Token non recu");
      }
    } catch (err) {
      setError(err.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    try {
      const univs = await getUniversites(1, 100);
      setStats({
        universites: univs.data?.length || 0,
      });
    } catch {
      // silently fail
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_token");
    setToken(null);
    setStats(null);
    setEmail("");
    setPassword("");
  }

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "2.5rem" }}>🔐</span>
          </div>
          <h1>Administration</h1>
          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "0.85rem",
              marginBottom: "1.5rem",
            }}
          >
            Espace reserve aux administrateurs
          </p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mafiliere.sn"
                required
              />
            </div>
            <div className="input-group">
              <label>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(220,38,38,0.15)",
                  color: "#f87171",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.85rem",
                  marginBottom: "0.75rem",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? "⏳ Connexion..." : "🔓 Se connecter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a" }}>
      {/* Admin Navbar */}
      <nav
        style={{
          background: "#1e293b",
          padding: "0.75rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #334155",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.2rem" }}>🔐</span>
          <span style={{ color: "white", fontWeight: 700, fontSize: "1.1rem" }}>
            Admin MaFiliere
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            color: "#f87171",
            fontSize: "0.85rem",
            fontWeight: 600,
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            transition: "all 0.2s",
          }}
        >
          Deconnexion
        </button>
      </nav>

      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: 800,
            marginBottom: "1.5rem",
          }}
        >
          📊 Tableau de bord
        </h1>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              borderRadius: "1rem",
              padding: "1.5rem",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                color: "#94a3b8",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Universites
            </div>
            <div
              style={{
                color: "white",
                fontSize: "2rem",
                fontWeight: 800,
                marginTop: "0.25rem",
              }}
            >
              {stats?.universites || "—"}
            </div>
          </div>
          <div
            style={{
              background: "#1e293b",
              borderRadius: "1rem",
              padding: "1.5rem",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                color: "#94a3b8",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Formations
            </div>
            <div
              style={{
                color: "white",
                fontSize: "2rem",
                fontWeight: 800,
                marginTop: "0.25rem",
              }}
            >
              1 748
            </div>
          </div>
          <div
            style={{
              background: "#1e293b",
              borderRadius: "1rem",
              padding: "1.5rem",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                color: "#94a3b8",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Series du bac
            </div>
            <div
              style={{
                color: "white",
                fontSize: "2rem",
                fontWeight: 800,
                marginTop: "0.25rem",
              }}
            >
              17
            </div>
          </div>
          <div
            style={{
              background: "#1e293b",
              borderRadius: "1rem",
              padding: "1.5rem",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                color: "#94a3b8",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Statut DB
            </div>
            <div
              style={{
                color: "#10b981",
                fontSize: "2rem",
                fontWeight: 800,
                marginTop: "0.25rem",
              }}
            >
              ✓ Active
            </div>
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: "1rem",
            padding: "1.5rem",
            border: "1px solid #334155",
          }}
        >
          <h3
            style={{
              color: "white",
              fontSize: "1rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            ℹ️ Informations systeme
          </h3>
          <div style={{ display: "grid", gap: "0.5rem", fontSize: "0.9rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#94a3b8",
              }}
            >
              <span>API Backend</span>
              <span style={{ color: "#10b981" }}>
                {process.env.NEXT_PUBLIC_BACKEND_URL || "Non configuré"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#94a3b8",
              }}
            >
              <span>Swagger UI</span>
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/swagger/index.html`}
                target="_blank"
                rel="noopener"
                style={{ color: "#3b82f6" }}
              >
                Ouvrir ↗
              </a>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#94a3b8",
              }}
            >
              <span>pgAdmin</span>
              <a
                href="http://localhost:5050"
                target="_blank"
                rel="noopener"
                style={{ color: "#3b82f6" }}
              >
                Ouvrir ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
