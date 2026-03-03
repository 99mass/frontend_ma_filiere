"use client";
import { useState, useEffect } from "react";
import { getRecommandations, uploadReleve } from "../lib/api";
import { SERIES_MATIERES, MENTIONS } from "../lib/series";
import {
  getUnivLogo,
  getUnivAbbrev,
  getUnivColor,
  getUnivSortOrder,
} from "../lib/universites";
import Image from "next/image";
const PAGE_SIZE = 18;

/* ── SVG ICONS ── */
const Icon = {
  camera: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  pencil: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  upload: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  file: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  ),
  check: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  x: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  xCircle: (
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
  ),
  alert: (
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  briefcase: (
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
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  briefcaseLg: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  university: (
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  book: (
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
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  graduationCap: (
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
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  mapPin: (
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  link: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  arrowRight: (
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  arrowLeft: (
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
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  search: (
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  target: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  spinner: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: "spin 0.7s linear infinite" }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  chevronRight: (
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  refresh: (
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
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12A9 9 0 0 1 6 18.7L3 16" />
    </svg>
  ),
  download: (
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
};

/* ── UNIV LOGO ── */
function UnivLogo({ nom, size = 44 }) {
  const logo = getUnivLogo(nom);
  if (logo)
    return (
      <div
        style={{
          width: size,
          height: size,
          minWidth: size,
          borderRadius: "var(--r-md)",
          overflow: "hidden",
          flexShrink: 0,
          background: "var(--bg-3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={logo}
          alt={nom}
          width={size}
          height={size}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </div>
    );
  const abbrev = getUnivAbbrev(nom);
  const color = getUnivColor(nom);
  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: "var(--r-md)",
        background: color + "18",
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: Math.max(10, size * 0.26),
        flexShrink: 0,
        border: `1.5px solid ${color}30`,
        fontFamily: "Syne, sans-serif",
        overflow: "hidden",
        whiteSpace: "nowrap",
        letterSpacing: "-0.03em",
        lineHeight: 1,
        padding: "2px",
        boxSizing: "border-box",
      }}
    >
      {abbrev}
    </div>
  );
}

export default function RecommandationPage() {
  /* ── RECO STATE ── */
  const [activeTab, setActiveTab] = useState("upload"); // "upload" ou "manuel"
  const [serie, setSerie] = useState("");
  const [mention, setMention] = useState("Passable");
  const [age, setAge] = useState(19);
  const [sexe, setSexe] = useState("M");
  const [moyenneBac, setMoyenneBac] = useState("");
  const [notes, setNotes] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [page, setPage] = useState(1);
  const [debouchesModal, setDebouchesModal] = useState(null);
  const [manualStep, setManualStep] = useState(1);
  const [collapsedUnivs, setCollapsedUnivs] = useState({});

  /* ── RECO HANDLERS ── */
  const matieres = serie ? SERIES_MATIERES[serie] || [] : [];
  const ITEMS_PER_STEP = 3;
  const totalGradeSteps =
    matieres.length > 0 ? Math.ceil(matieres.length / ITEMS_PER_STEP) : 1;

  function handleSerieChange(e) {
    const s = e.target.value;
    setSerie(s);
    setResults(null);
    setError("");
    const nn = {};
    (SERIES_MATIERES[s] || []).forEach((m) => {
      nn[m.nom] = { note: "", coef: m.coef };
    });
    setNotes(nn);
    setManualStep(1);
  }

  function handleMoyenneBacChange(e) {
    let val = e.target.value;
    if (val !== "" && parseFloat(val) > 20) val = "20";
    if (val !== "" && parseFloat(val) < 0) val = "0";
    setMoyenneBac(val);
  }

  function handleNoteChange(matiere, value) {
    let val = value;
    if (val !== "" && parseFloat(val) > 20) val = "20";
    if (val !== "" && parseFloat(val) < 0) val = "0";
    setNotes((prev) => ({
      ...prev,
      [matiere]: { ...prev[matiere], note: val },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!serie) {
      setError("Choisis ta série du bac");
      return;
    }
    if (!moyenneBac) {
      setError("Saisis ta moyenne du bac");
      return;
    }
    const notesPayload = {};
    for (const [mat, data] of Object.entries(notes)) {
      if (!data.note && data.note !== 0) {
        setError("Remplis toutes tes notes");
        return;
      }
      notesPayload[mat] = {
        note: parseFloat(data.note),
        coef: parseFloat(data.coef),
      };
    }
    setLoading(true);
    setPage(1);
    try {
      const res = await getRecommandations({
        serie,
        moyenne_bac: parseFloat(moyenneBac),
        mention,
        age: parseInt(age),
        sexe,
        notes: notesPayload,
      });
      setResults(res.data || []);
    } catch (err) {
      setError(err.message || "Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!uploadFile) {
      setError("Sélectionne un fichier");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const resp = await uploadReleve(uploadFile);
      const data = resp.data || resp;
      if (data.notes) {
        setUploadResult(data);
        setSerie(data.serie || "");
        setMoyenneBac(data.moyenne_bac?.toString() || "");
        setAge(data.age || 19);
        setSexe(data.sexe || "M");
        setMention(data.mention || "Passable");

        if (data.serie && SERIES_MATIERES[data.serie]) {
          const nn = {};
          SERIES_MATIERES[data.serie].forEach((m) => {
            const extractedItem =
              data.notes[m.nom] ||
              data.notes[m.nom.toUpperCase()] ||
              data.notes[m.nom.toLowerCase()];
            nn[m.nom] = {
              note: extractedItem?.note?.toString() || "",
              coef: m.coef,
            };
          });
          setNotes(nn);
        }
        setActiveTab("manuel");
      } else {
        setError("Les notes n'ont pas pu être extraites.");
      }
    } catch (err) {
      setError(
        err.message || "Erreur lors du traitement. Utilise la saisie manuelle.",
      );
    } finally {
      setUploading(false);
    }
  }

  function handleReset() {
    setActiveTab("upload");
    setSerie("");
    setMention("Passable");
    setAge(19);
    setSexe("M");
    setMoyenneBac("");
    setNotes({});
    setResults(null);
    setError("");
    setUploadFile(null);
    setUploadResult(null);
    setPage(1);
    setManualStep(1);
  }

  function getProbLabel(score, eligible) {
    if (!eligible)
      return {
        label: "Non éligible",
        color: "var(--red)",
        bg: "var(--red-dim)",
      };
    const s = parseFloat(score) || 0;
    if (s >= 80)
      return {
        label: "Très forte",
        color: "#059669",
        bg: "rgba(5,150,105,0.1)",
      };
    if (s >= 60)
      return { label: "Forte", color: "var(--green)", bg: "var(--green-dim)" };
    if (s >= 40)
      return { label: "Modérée", color: "var(--gold)", bg: "var(--gold-dim)" };
    return { label: "Faible", color: "var(--muted)", bg: "var(--bg-3)" };
  }

  const totalPages = results ? Math.ceil(results.length / PAGE_SIZE) : 0;
  const paginated = results
    ? results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : [];

  return (
    <div className="page-wrapper">
      <div className="container">
        <div
          style={{
            textAlign: "center",
            marginBottom: "0.5rem",
            maxWidth: 720,
            margin: "0 auto 2.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Cette plateforme vous <strong>suggère</strong> les filières qui
            correspondent le mieux à votre profil. Ces recommandations
            s'appuient sur les{" "}
            <strong>données réelles des universités (via Campusen)</strong> pour
            vous aider dans vos choix d'orientation, avec un aperçu clair des
            débouchés professionnels possibles.
            <br />
            <br />
            Deux méthodes s'offrent à vous : utilisez l'
            <strong>Intelligence Artificielle</strong> pour analyser rapidement
            une photo ou un PDF de votre relevé de notes, ou procédez à une{" "}
            <strong>saisie manuelle</strong> classique.
          </p>
        </div>

        {/* Tab Selection */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              borderBottom: "2px solid var(--border)",
              gap: "2rem",
            }}
          >
            <button
              onClick={() => {
                setActiveTab("upload");
                setError("");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0",
                fontSize: "1rem",
                fontWeight: activeTab === "upload" ? 700 : 500,
                color: activeTab === "upload" ? "var(--green)" : "var(--muted)",
                background: "transparent",
                border: "none",
                borderBottom:
                  activeTab === "upload"
                    ? "3px solid var(--green)"
                    : "3px solid transparent",
                marginBottom: "-2px",
                transition: "all 0.2s ease",
              }}
            >
              {Icon.camera} Relevé (Recommandé)
            </button>
            <button
              onClick={() => {
                setActiveTab("manuel");
                setError("");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0",
                fontSize: "1rem",
                fontWeight: activeTab === "manuel" ? 700 : 500,
                color: activeTab === "manuel" ? "var(--green)" : "var(--muted)",
                background: "transparent",
                border: "none",
                borderBottom:
                  activeTab === "manuel"
                    ? "3px solid var(--green)"
                    : "3px solid transparent",
                marginBottom: "-2px",
                transition: "all 0.2s ease",
              }}
            >
              {Icon.pencil} Saisie manuelle
            </button>
          </div>
        </div>

        {/* Dynamic Display based on active tab */}
        {activeTab === "upload" && !results && !uploadResult && (
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <form onSubmit={handleUpload} className="card">
              <div style={{ marginBottom: "1.25rem" }}>
                <h2
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {Icon.camera} Relevé de notes
                </h2>
              </div>

              <label
                htmlFor="file-upload"
                className="upload-zone"
                style={{
                  display: "block",
                  cursor: "pointer",
                  marginBottom: "1.25rem",
                }}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  style={{ display: "none" }}
                  id="file-upload"
                />
                {uploadFile ? (
                  <>
                    <div
                      className="upload-icon"
                      style={{ color: "var(--green)" }}
                    >
                      {Icon.check}
                    </div>
                    <div style={{ fontWeight: 600, color: "var(--green)" }}>
                      {uploadFile.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                        marginTop: "0.25rem",
                      }}
                    >
                      Clique pour changer
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="upload-icon"
                      style={{ color: "var(--muted)" }}
                    >
                      {Icon.upload}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "var(--text)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Clique pour choisir un fichier
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                      PNG, JPG ou PDF
                    </div>
                  </>
                )}
              </label>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "80%" }}
                  disabled={uploading || !uploadFile}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                    }}
                  >
                    {uploading ? Icon.spinner : Icon.upload}{" "}
                    {uploading ? "En cours..." : "Extraire mes notes"}
                  </span>
                </button>
              </div>
              <div
                style={{
                  background: "var(--bg)",
                  padding: "1rem",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--border)",
                  marginTop: "1rem",
                }}
              >
                <h4
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    marginBottom: "0.4rem",
                    color: "var(--text)",
                  }}
                >
                  Comment ça marche ?
                </h4>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  Prends en photo ou sélectionne le PDF de ton{" "}
                  <strong>relevé de notes officiel du baccalauréat</strong>.
                  Assure-toi que l'image soit bien nette et éclairée pour que
                  notre IA puisse extraire tes notes sans erreur.
                </p>
              </div>

              {error && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "var(--red-dim)",
                    color: "var(--red)",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--r-md)",
                    fontSize: "0.85rem",
                    marginBottom: "1rem",
                  }}
                >
                  {Icon.alert} {error}
                </div>
              )}
            </form>
          </div>
        )}

        {(activeTab === "manuel" || uploadResult || results) && (
          <div
            className="reco-layout"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {/* FORM */}
            <div
              className="reco-form"
              style={{
                width: "100%",
                maxWidth: results ? "400px" : "600px",
                transition: "max-width 0.3s ease",
              }}
            >
              <form className="card" onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <div
                    className="page-eyebrow"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    {Icon.pencil} Formulaire
                  </div>
                  <h2
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    Tes informations
                  </h2>
                </div>

                {manualStep === 1 && (
                  <div>
                    <div className="input-group">
                      <label>Série du bac *</label>
                      <select
                        value={serie}
                        onChange={handleSerieChange}
                        required
                      >
                        <option value="">-- Choisir --</option>
                        {Object.keys(SERIES_MATIERES).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.75rem",
                      }}
                    >
                      <div className="input-group">
                        <label>Moyenne bac *</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="20"
                          placeholder="Ex: 11.54"
                          value={moyenneBac}
                          onChange={handleMoyenneBacChange}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label>Âge</label>
                        <input
                          type="number"
                          min="15"
                          max="40"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.75rem",
                      }}
                    >
                      <div className="input-group">
                        <label>Mention</label>
                        <select
                          value={mention}
                          onChange={(e) => setMention(e.target.value)}
                        >
                          {MENTIONS.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.value}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="input-group">
                        <label>Sexe</label>
                        <select
                          value={sexe}
                          onChange={(e) => setSexe(e.target.value)}
                        >
                          <option value="M">Masculin</option>
                          <option value="F">Féminin</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ width: "100%", marginTop: "1rem" }}
                      disabled={!serie || !moyenneBac}
                      onClick={() => setManualStep(2)}
                    >
                      Suivant {Icon.chevronRight}
                    </button>
                  </div>
                )}

                {manualStep >= 2 && (
                  <div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        margin: "0.5rem 0 0.75rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        Notes par matière ({serie}) - Étape {manualStep - 1} /{" "}
                        {totalGradeSteps}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setError("");
                          setManualStep((prev) => prev - 1);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--green)",
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        Retour
                      </button>
                    </div>

                    {matieres.length > 0 ? (
                      <div
                        style={{
                          maxHeight: "300px",
                          overflowY: "auto",
                          paddingRight: "5px",
                        }}
                      >
                        {matieres
                          .slice(
                            (manualStep - 2) * ITEMS_PER_STEP,
                            (manualStep - 1) * ITEMS_PER_STEP,
                          )
                          .map((m) => (
                            <div
                              key={m.nom}
                              className="input-group"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              <label>
                                {m.nom}{" "}
                                <span
                                  style={{
                                    color: "var(--muted)",
                                    fontWeight: 400,
                                  }}
                                >
                                  coef. {m.coef}
                                </span>
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="20"
                                placeholder="/20"
                                value={notes[m.nom]?.note || ""}
                                onChange={(e) =>
                                  handleNoteChange(m.nom, e.target.value)
                                }
                                required
                              />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                        Veuillez sélectionner une série à l'étape précédente.
                      </p>
                    )}

                    {error && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "var(--red-dim)",
                          color: "var(--red)",
                          padding: "0.75rem 1rem",
                          borderRadius: "var(--r-md)",
                          fontSize: "0.85rem",
                          marginBottom: "0.75rem",
                          marginTop: "0.75rem",
                        }}
                      >
                        {Icon.alert} {error}
                      </div>
                    )}

                    {manualStep - 1 < totalGradeSteps ? (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ width: "100%", marginTop: "1rem" }}
                        onClick={() => {
                          const currentSlice = matieres.slice(
                            (manualStep - 2) * ITEMS_PER_STEP,
                            (manualStep - 1) * ITEMS_PER_STEP,
                          );
                          const allFilled = currentSlice.every(
                            (m) =>
                              notes[m.nom]?.note !== "" &&
                              notes[m.nom]?.note !== undefined,
                          );
                          if (allFilled) {
                            setError("");
                            setManualStep((prev) => prev + 1);
                          } else {
                            setError(
                              "Veuillez remplir toutes les notes de cette étape.",
                            );
                          }
                        }}
                      >
                        Suivant {Icon.chevronRight}
                      </button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ flex: "2 1 auto", minWidth: "240px" }}
                          disabled={loading || !serie}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.4rem",
                            }}
                          >
                            {loading ? Icon.spinner : Icon.target}{" "}
                            {loading
                              ? "Calcul..."
                              : "Obtenir mes recommandations"}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="btn"
                          style={{
                            flex: "1 1 auto",
                            minWidth: "160px",
                            background: "var(--bg-3)",
                            color: "var(--text)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.4rem",
                          }}
                          onClick={handleReset}
                          disabled={loading}
                        >
                          {Icon.refresh} Réinitialiser
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* RESULTS */}
            {(results || loading) && (
              <div
                className="results-area"
                style={{
                  flex: 1,
                  minWidth: "300px",
                  maxWidth: "800px",
                }}
              >
                {loading && (
                  <div style={{ textAlign: "center", padding: "3rem" }}>
                    <div className="spinner" />
                    <p className="loading-text">Analyse en cours...</p>
                  </div>
                )}
                {results && results.length === 0 && (
                  <div className="empty-state">
                    <div
                      className="icon"
                      style={{
                        color: "var(--muted)",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {Icon.alert}
                    </div>
                    <h3>Aucun résultat trouvé</h3>
                    <p>
                      Vérifie tes notes ou essaie avec une autre série. Il est
                      possible que tes résultats soient insuffisants pour les
                      filières disponibles.
                    </p>
                  </div>
                )}
                {results &&
                  results.length > 0 &&
                  (() => {
                    // Grouper par université — uniquement les filières éligibles
                    // Dédupliquer par filiere_id pour éviter les doublons (même filière dans plusieurs UFR)
                    const eligibles = results.filter((r) => r.eligible);
                    const grouped = {};
                    eligibles.forEach((r) => {
                      const key = r.universite || "Autre";
                      if (!grouped[key])
                        grouped[key] = { filieres: [], seenIds: new Set() };
                      const filiereId =
                        r.filiere?._id || r.filiere?.id || r.filiere?.nom;
                      if (
                        !grouped[key].seenIds.has(filiereId) &&
                        grouped[key].filieres.length < 5
                      ) {
                        grouped[key].seenIds.add(filiereId);
                        grouped[key].filieres.push(r);
                      }
                    });
                    const univKeys = Object.keys(grouped).sort(
                      (a, b) => getUnivSortOrder(a) - getUnivSortOrder(b),
                    );

                    if (univKeys.length === 0)
                      return (
                        <div className="empty-state">
                          <div
                            className="icon"
                            style={{
                              color: "var(--muted)",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {Icon.xCircle}
                          </div>
                          <h3>Aucune filière éligible</h3>
                          <p>
                            Aucune filière ne correspond à ton profil. Vérifie
                            tes informations.
                          </p>
                        </div>
                      );

                    return (
                      <>
                        {/* Header */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1.25rem",
                          }}
                        >
                          <h2
                            style={{
                              fontSize: "1.05rem",
                              fontWeight: 700,
                              color: "var(--text)",
                            }}
                          >
                            {univKeys.reduce(
                              (acc, k) => acc + grouped[k].filieres.length,
                              0,
                            )}{" "}
                            filière
                            {univKeys.reduce(
                              (acc, k) => acc + grouped[k].filieres.length,
                              0,
                            ) > 1
                              ? "s"
                              : ""}{" "}
                            éligible
                            {univKeys.reduce(
                              (acc, k) => acc + grouped[k].filieres.length,
                              0,
                            ) > 1
                              ? "s"
                              : ""}
                          </h2>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.78rem",
                                color: "var(--muted)",
                                background: "var(--bg-3)",
                                padding: "0.25rem 0.65rem",
                                borderRadius: "var(--r-full)",
                                border: "1px solid var(--border)",
                              }}
                            >
                              {univKeys.length} université
                              {univKeys.length > 1 ? "s" : ""}
                            </span>
                            <button
                              className="btn btn-sm print-hidden"
                              style={{
                                background: "var(--surface)",
                                border: "1.5px solid var(--border-2)",
                                color: "var(--text-2)",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                padding: "0.35rem 0.8rem",
                                borderRadius: "var(--r-full)",
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "var(--transition)",
                              }}
                              onClick={() => window.print()}
                              onMouseOver={(e) => {
                                e.currentTarget.style.borderColor =
                                  "var(--green)";
                                e.currentTarget.style.color = "var(--green)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.borderColor =
                                  "var(--border-2)";
                                e.currentTarget.style.color = "var(--text-2)";
                              }}
                            >
                              {Icon.download} Télécharger PDF
                            </button>
                          </div>
                        </div>

                        {/* Blocs par université */}
                        {univKeys.map((univNom) => {
                          const filieres = grouped[univNom].filieres;
                          return (
                            <div
                              key={univNom}
                              style={{
                                marginBottom: "1.25rem",
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--r-xl)",
                                overflow: "hidden",
                                boxShadow: "var(--shadow-sm)",
                              }}
                            >
                              {/* En-tête université — cliquable pour collapse */}
                              <div
                                onClick={() =>
                                  setCollapsedUnivs((prev) => ({
                                    ...prev,
                                    [univNom]: !prev[univNom],
                                  }))
                                }
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.75rem",
                                  padding: "0.85rem 1.1rem",
                                  borderBottom: collapsedUnivs[univNom]
                                    ? "none"
                                    : "1px solid var(--border)",
                                  background: "var(--bg)",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  transition: "background 0.15s",
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.background =
                                    "var(--bg-3)")
                                }
                                onMouseOut={(e) =>
                                  (e.currentTarget.style.background =
                                    "var(--bg)")
                                }
                              >
                                <UnivLogo nom={univNom} size={48} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div
                                    style={{
                                      fontWeight: 700,
                                      fontSize: "0.9rem",
                                      color: "var(--text)",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {univNom}
                                  </div>
                                </div>
                                <span
                                  style={{
                                    flexShrink: 0,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.3rem",
                                    padding: "0.2rem 0.6rem",
                                    borderRadius: "var(--r-full)",
                                    background: "var(--green-dim)",
                                    color: "var(--green)",
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  {Icon.check} {filieres.length} filière
                                  {filieres.length > 1 ? "s" : ""}
                                </span>
                                {/* Chevron */}
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="var(--muted)"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  style={{
                                    flexShrink: 0,
                                    transition: "transform 0.2s",
                                    transform: collapsedUnivs[univNom]
                                      ? "rotate(-90deg)"
                                      : "rotate(0deg)",
                                  }}
                                >
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </div>

                              {/* Liste des filières — masquée si collapsed */}
                              {!collapsedUnivs[univNom] && (
                                <div
                                  style={{ padding: "0.5rem 0.75rem 0.75rem" }}
                                >
                                  {filieres.map((r, i) => {
                                    const prob = getProbLabel(
                                      r.score,
                                      r.eligible,
                                    );
                                    return (
                                      <div
                                        key={i}
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start",
                                          justifyContent: "space-between",
                                          gap: "0.75rem",
                                          padding: "0.65rem 0.5rem",
                                          borderBottom:
                                            i < filieres.length - 1
                                              ? "1px solid var(--border)"
                                              : "none",
                                        }}
                                      >
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          <div
                                            style={{
                                              fontWeight: 600,
                                              fontSize: "0.88rem",
                                              color: "var(--text)",
                                              marginBottom: "0.2rem",
                                            }}
                                          >
                                            {r.filiere?.nom || "Filière"}
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexWrap: "wrap",
                                              gap: "0.4rem",
                                              alignItems: "center",
                                            }}
                                          >
                                            {r.ufr && (
                                              <span
                                                style={{
                                                  display: "inline-flex",
                                                  alignItems: "center",
                                                  gap: "0.2rem",
                                                  fontSize: "0.72rem",
                                                  color: "var(--muted)",
                                                }}
                                              >
                                                {Icon.book} {r.ufr}
                                              </span>
                                            )}
                                            {r.filiere?.niveau_sortie && (
                                              <span
                                                style={{
                                                  display: "inline-flex",
                                                  alignItems: "center",
                                                  gap: "0.2rem",
                                                  fontSize: "0.72rem",
                                                  color: "var(--muted)",
                                                }}
                                              >
                                                {Icon.graduationCap}{" "}
                                                {r.filiere.niveau_sortie}
                                              </span>
                                            )}
                                          </div>
                                          {r.debouches?.length > 0 && (
                                            <button
                                              onClick={() =>
                                                setDebouchesModal({
                                                  filiere:
                                                    r.filiere?.nom || "Filière",
                                                  debouches: r.debouches,
                                                })
                                              }
                                              style={{
                                                marginTop: "0.4rem",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "0.3rem",
                                                padding: "0.25rem 0.65rem",
                                                borderRadius: "var(--r-full)",
                                                border:
                                                  "1px solid var(--border-2)",
                                                background: "var(--bg)",
                                                color: "var(--text-2)",
                                                fontSize: "0.72rem",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                transition: "var(--transition)",
                                              }}
                                              onMouseOver={(e) => {
                                                e.currentTarget.style.borderColor =
                                                  "var(--green)";
                                                e.currentTarget.style.color =
                                                  "var(--green)";
                                              }}
                                              onMouseOut={(e) => {
                                                e.currentTarget.style.borderColor =
                                                  "var(--border-2)";
                                                e.currentTarget.style.color =
                                                  "var(--text-2)";
                                              }}
                                            >
                                              {Icon.briefcase} Débouchés (
                                              {r.debouches.length})
                                            </button>
                                          )}
                                        </div>
                                        {/* Badge probabilité */}
                                        {/* { prob.label!="Faible" &&  <span
                                          style={{
                                            flexShrink: 0,
                                            display: "inline-block",
                                            padding: "0.2rem 0.6rem",
                                            borderRadius: "var(--r-full)",
                                            background: prob.bg,
                                            color: prob.color,
                                            fontWeight: 700,
                                            fontSize: "0.72rem",
                                            marginTop: "0.1rem",
                                          }}
                                        >
                                          {prob.label}
                                        </span>} */}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </>
                    );
                  })()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL DÉBOUCHÉS */}
      {debouchesModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDebouchesModal(null);
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--green)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  {Icon.briefcase} Débouchés professionnels
                </div>
                <h2>{debouchesModal.filiere}</h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setDebouchesModal(null)}
              >
                {Icon.xCircle}
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {debouchesModal.debouches.map((d, i) => (
                <div
                  key={i}
                  style={{
                    padding: "0.75rem 1rem",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-md)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--text)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {d.metier}
                  </div>
                  {d.description && (
                    <div
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.8rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      {d.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
