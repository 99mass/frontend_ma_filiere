// Mapping des noms d'universités vers leurs logos
// Les logos sont dans /public/logos/
const UNIV_LOGOS = {
  "Universite Cheikh Anta Diop": "/logos/ucad.jpg",
  "Universite Gaston Berger": "/logos/ugb.jpg",
  "Universite Alioune Diop de Bambey": "/logos/uadb.jpg",
  "Universite numerique Cheikh Hamidou KANE": "/logos/unchk.jpg",
  "Universite Amadou Mahtar Mbow": "/logos/uam.jpg",
  "Universite Iba Der Thiam": "/logos/uidt.jpg",
  "Universite Assane Seck de Ziguinchor": "/logos/uasz.jpg",
  "Universite Sine-Saloum El Hadji Ibrahima Niasse": "/logos/ussein.jpg",

  "Institut Superieur d'Enseignement Professionnel Amadou Traware (ex. Isep Diamniadio)":
    "/logos/isep_diamniadio.jpg",
  "Institut Superieur d'Enseignement Professionnel Bignona":
    "/logos/isep_bignona.jpg",
  "Institut Superieur d'Enseignement Professionnel Matam":
    "/logos/isep_matam.jpg",
  "Institut Superieur d'Enseignement Professionnel Mbacke":
    "/logos/isep_mbacke.jpg",
  "Institut Superieur d'Enseignement Professionnel Richard Toll":
    "/logos/isep_richatol.jpg",
  "Institut Superieur d'Enseignement Professionnel Thies":
    "/logos/isep_thies.jpg",
};

// Abréviations pour l'affichage en fallback
const UNIV_ABBREVS = {
  "Universite Cheikh Anta Diop": "UCAD",
  "Universite Gaston Berger": "UGB",
  "Universite Alioune Diop de Bambey": "UADB",
  "Universite Assane Seck de Ziguinchor": "UASZ",
  "Universite Iba Der Thiam": "UIDT",
  "Universite numerique Cheikh Hamidou KANE": "UNCHK",
  "Universite Amadou Mahtar Mbow": "UAM",
  "Universite Sine-Saloum El Hadji Ibrahima Niasse": "USSEIN",
  "Institut Superieur d'Enseignement Professionnel Amadou Traware (ex. Isep Diamniadio)":
    "ISEP-D",
  "Institut Superieur d'Enseignement Professionnel Bignona": "ISEP-B",
  "Institut Superieur d'Enseignement Professionnel Matam": "ISEP-M",
  "Institut Superieur d'Enseignement Professionnel Mbacke": "ISEP-Mb",
  "Institut Superieur d'Enseignement Professionnel Richard Toll": "ISEP-RT",
  "Institut Superieur d'Enseignement Professionnel Thies": "ISEP-T",
};

// Ordre d'affichage : universités (plus ancienne → plus récente), puis instituts (même logique)
const UNIV_ORDER = [
  // === Universités (par ancienneté) ===
  "Universite Cheikh Anta Diop", // 1957
  "Universite Gaston Berger", // 1990
  "Universite Alioune Diop de Bambey", // 2007
  "Universite Assane Seck de Ziguinchor", // 2007
  "Universite Iba Der Thiam", // 2007 (ex-Thies)
  "Universite numerique Cheikh Hamidou KANE", // 2013
  "Universite Amadou Mahtar Mbow", // 2017
  "Universite Sine-Saloum El Hadji Ibrahima Niasse", // 2018
  // === Instituts (par ancienneté) ===
  "Institut Superieur d'Enseignement Professionnel Thies",
  "Institut Superieur d'Enseignement Professionnel Richard Toll",
  "Institut Superieur d'Enseignement Professionnel Matam",
  "Institut Superieur d'Enseignement Professionnel Bignona",
  "Institut Superieur d'Enseignement Professionnel Amadou Traware (ex. Isep Diamniadio)",
  "Institut Superieur d'Enseignement Professionnel Mbacke",
];

// Couleurs associées pour les fallback initials
const UNIV_COLORS = [
  "#0D8A3F",
  "#2563eb",
  "#7c3aed",
  "#dc2626",
  "#d97706",
  "#0891b2",
  "#059669",
  "#4f46e5",
  "#be123c",
  "#0d9488",
  "#6366f1",
  "#ea580c",
  "#16a34a",
  "#9333ea",
];

export function getUnivLogo(nom) {
  return UNIV_LOGOS[nom] || null;
}

export function getUnivAbbrev(nom) {
  return (
    UNIV_ABBREVS[nom] ||
    nom
      .split(" ")
      .map((w) => w[0])
      .filter((c) => c && c === c.toUpperCase())
      .join("")
      .slice(0, 4)
  );
}

export function getUnivColor(nom) {
  let hash = 0;
  for (let i = 0; i < nom.length; i++)
    hash = nom.charCodeAt(i) + ((hash << 5) - hash);
  return UNIV_COLORS[Math.abs(hash) % UNIV_COLORS.length];
}

// Retourne l'ordre de tri d'une université (plus petit = plus ancien)
export function getUnivSortOrder(nom) {
  const idx = UNIV_ORDER.indexOf(nom);
  return idx >= 0 ? idx : 999;
}
