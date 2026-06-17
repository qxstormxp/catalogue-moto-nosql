// ============================================================
// API PRODUITS — toutes les opérations Firestore au même endroit
// ------------------------------------------------------------
// Ce module est importé par la page publique (app.js) et par
// la page d'administration (admin.js) : le code CRUD n'est
// écrit qu'une seule fois.
// ============================================================

import { db } from "./firebase-config.js";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  query, where,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// Liste fermée des catégories : alimente les <select> et les filtres.
export const CATEGORIES = [
  "Freinage", "Pneumatique", "Transmission", "Échappement",
  "Filtration", "Éclairage", "Carrosserie", "Accessoires",
];

// Raccourci vers la collection « produits ».
const refProduits = () => collection(db, "produits");

// READ — liste des produits, avec filtre catégorie optionnel.
// Le filtre est une VRAIE requête Firestore (where) : seuls les
// documents de la catégorie demandée sont téléchargés.
// Le tri alphabétique est fait côté client : combiner where + orderBy
// exigerait un index composite, inutile à cette échelle.
export async function listerProduits(categorie = "") {
  const q = categorie
    ? query(refProduits(), where("categorie", "==", categorie))
    : refProduits();

  const instantane = await getDocs(q);
  const produits = instantane.docs.map((d) => ({ id: d.id, ...d.data() }));
  produits.sort((a, b) => (a.nom || "").localeCompare(b.nom || "", "fr"));
  return produits;
}

// CREATE — Firestore génère l'identifiant du document.
export function ajouterProduit(donnees) {
  return addDoc(refProduits(), donnees);
}

// UPDATE — remplace les champs fournis du document ciblé.
export function modifierProduit(id, donnees) {
  return updateDoc(doc(db, "produits", id), donnees);
}

// DELETE — suppression définitive du document.
export function supprimerProduit(id) {
  return deleteDoc(doc(db, "produits", id));
}

// ------------------------------------------------------------
// Utilitaires d'affichage partagés
// ------------------------------------------------------------

// Prix au format français : 39.9 → « 39,90 € »
export const formatPrix = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })
    .format(Number(n) || 0);

// Échappe le HTML des données avant insertion dans la page
// (protection contre l'injection de balises via les champs saisis).
export const echap = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

// Image de repli si le champ « image » est vide ou cassé.
export const IMAGE_DEFAUT =
  "https://placehold.co/600x400/1a2228/5e6b76?text=Pas+de+photo";

// Système de notifications (toasts) commun aux deux pages.
export function notifier(message, type = "ok") {
  const zone = document.getElementById("toasts");
  if (!zone) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.role = "status";
  toast.textContent = message;
  zone.append(toast);
  setTimeout(() => toast.remove(), 3500);
}
