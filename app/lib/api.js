const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  };

  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur de connexion au serveur");
  }

  return data;
}

// ===== Public endpoints =====

export async function getUniversites(page = 1, limit = 100) {
  return fetchAPI(`/universites?page=${page}&limit=${limit}`);
}

export async function getUniversite(id) {
  return fetchAPI(`/universites/${id}`);
}

export async function getUfrByUniversite(universiteId) {
  return fetchAPI(`/ufr/by-universite/${universiteId}`);
}

export async function getFilieres(page = 1, limit = 100) {
  return fetchAPI(`/filieres?page=${page}&limit=${limit}`);
}

export async function getFiliere(id) {
  return fetchAPI(`/filieres/${id}`);
}

export async function getFilieresByUfr(ufrId) {
  return fetchAPI(`/filieres/by-ufr/${ufrId}`);
}

export async function getConditionsByFiliere(filiereId) {
  return fetchAPI(`/admission/${filiereId}`);
}

export async function getDebouchesByFiliere(filiereId) {
  return fetchAPI(`/debouches/${filiereId}`);
}

export async function getRecommandations(data) {
  return fetchAPI("/recommandation", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function uploadReleve(file) {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${API_BASE}/ocr/releve`;
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Erreur de connexion serveur OCR");
  }
  return data;
}

// ===== Admin endpoints =====

export async function login(email, password) {
  return fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(email, password, nom) {
  return fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, mot_de_passe: password, nom }),
  });
}
