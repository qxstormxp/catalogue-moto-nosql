// ============================================================
// PAGE D'ADMINISTRATION — connexion + CRUD complet
// ------------------------------------------------------------
// 1. Tant que l'utilisateur n'est pas connecté : seul l'écran
//    de connexion est visible (mot de passe vérifié par
//    empreinte SHA-256 — voir js/auth.js).
// 2. Une fois connecté : liste de gestion + formulaire
//    d'ajout / modification + suppression avec confirmation.
// ============================================================

import {
  CATEGORIES, listerProduits, ajouterProduit, modifierProduit,
  supprimerProduit, formatPrix, echap, IMAGE_DEFAUT, notifier,
} from "./api.js";
import { connecter, estConnecte, deconnecter } from "./auth.js";
import { DONNEES_DEMO } from "./donnees-demo.js";

// ---------- Raccourcis DOM ----------
const $ = (sel) => document.querySelector(sel);
const ecranConnexion = $("#ecran-connexion");
const ecranGestion   = $("#ecran-gestion");
const btnDeconnexion = $("#btn-deconnexion");
const listeProduits  = $("#liste-produits");
const compteur       = $("#compteur");
const vide           = $("#vide");
const dlgForm        = $("#dialogue-form");
const formProduit    = $("#form-produit");
const listeAttributs = $("#liste-attributs");

let produits = [];

// ============================================================
// CONNEXION
// ============================================================
function basculerEcrans() {
  const ok = estConnecte();
  ecranConnexion.classList.toggle("masque", ok);
  ecranGestion.classList.toggle("masque", !ok);
  btnDeconnexion.classList.toggle("masque", !ok);
  if (ok) charger();
}

$("#form-connexion").addEventListener("submit", async (e) => {
  e.preventDefault();
  const saisie = $("#champ-mdp").value;
  const erreur = $("#erreur-connexion");

  if (await connecter(saisie)) {
    erreur.textContent = "";
    $("#champ-mdp").value = "";
    notifier("Connexion réussie. Bienvenue !", "ok");
    basculerEcrans();
  } else {
    erreur.textContent = "Mot de passe incorrect.";
    $("#champ-mdp").select();
  }
});

btnDeconnexion.addEventListener("click", () => {
  deconnecter();
  notifier("Vous êtes déconnecté.", "ok");
  basculerEcrans();
});

// ============================================================
// LISTE DE GESTION
// ============================================================
async function charger() {
  compteur.textContent = "Chargement…";
  try {
    produits = await listerProduits();
    afficher();
  } catch (erreur) {
    console.error("Erreur Firestore :", erreur);
    compteur.textContent = "";
    notifier("Impossible de joindre la base de données.", "erreur");
  }
}

function afficher() {
  compteur.textContent =
    `${produits.length} pièce${produits.length > 1 ? "s" : ""} en base`;
  vide.classList.toggle("masque", produits.length > 0);

  listeProduits.innerHTML = produits.map((p) => `
    <div class="ligne-produit" data-id="${p.id}">
      <img src="${echap(p.image || IMAGE_DEFAUT)}" alt=""
           loading="lazy" onerror="this.src='${IMAGE_DEFAUT}'" />
      <div class="ligne-infos">
        <div class="nom">${echap(p.nom)}</div>
        <div class="meta">
          <span>${echap(p.categorie || "—")}</span>
          <span>${echap(p.marque || "—")}</span>
          <span class="prix">${formatPrix(p.prix)}</span>
        </div>
      </div>
      <div class="ligne-actions">
        <button class="btn btn-petit" data-action="modifier">Modifier</button>
        <button class="btn btn-petit btn-danger" data-action="supprimer">Supprimer</button>
      </div>
    </div>`).join("");
}

// Délégation : un seul écouteur pour toutes les lignes.
listeProduits.addEventListener("click", async (e) => {
  const bouton = e.target.closest("[data-action]");
  if (!bouton) return;
  const id = bouton.closest("[data-id]").dataset.id;
  const produit = produits.find((p) => p.id === id);
  if (!produit) return;

  if (bouton.dataset.action === "modifier") ouvrirFormulaire(produit);

  if (bouton.dataset.action === "supprimer") {
    if (!confirm(`Supprimer « ${produit.nom} » ? Cette action est définitive.`)) return;
    try {
      await supprimerProduit(id);                 // DELETE Firestore
      notifier("Pièce supprimée.", "ok");
      charger();
    } catch (erreur) {
      console.error(erreur);
      notifier("La suppression a échoué.", "erreur");
    }
  }
});

// ============================================================
// FORMULAIRE AJOUT / MODIFICATION
// ============================================================
for (const c of CATEGORIES) $("#champ-categorie").append(new Option(c, c));

$("#btn-ajouter").addEventListener("click", () => ouvrirFormulaire(null));
$("#btn-attribut").addEventListener("click", () => ajouterLigneAttribut());

dlgForm.addEventListener("click", (e) => {
  if (e.target === dlgForm || e.target.closest("[data-fermer]")) dlgForm.close();
});

// Le même formulaire sert à la création (produit = null)
// et à la modification (produit pré-rempli, id caché).
function ouvrirFormulaire(produit) {
  formProduit.reset();
  listeAttributs.innerHTML = "";
  $("#champ-id").value = produit?.id || "";
  $("#form-titre").textContent = produit ? "Modifier la pièce" : "Ajouter une pièce";

  if (produit) {
    $("#champ-nom").value = produit.nom || "";
    $("#champ-marque").value = produit.marque || "";
    $("#champ-categorie").value = produit.categorie || "";
    $("#champ-prix").value = produit.prix ?? "";
    $("#champ-image").value = produit.image || "";
    $("#champ-compatibilites").value = (produit.compatibilites || []).join("\n");
    for (const [cle, val] of Object.entries(produit.attributs || {})) {
      ajouterLigneAttribut(cle, val);
    }
  } else {
    ajouterLigneAttribut(); // une ligne vide pour démarrer
  }
  dlgForm.showModal();
}

// Une ligne clé / valeur pour l'objet « attributs ».
function ajouterLigneAttribut(cle = "", valeur = "") {
  const ligne = document.createElement("div");
  ligne.className = "ligne-attribut";
  ligne.innerHTML = `
    <input type="text" placeholder="clé (ex. matiere)" value="${echap(cle)}" data-cle />
    <input type="text" placeholder="valeur (ex. céramique)" value="${echap(valeur)}" data-valeur />
    <button class="btn btn-petit btn-danger" type="button" aria-label="Retirer">✕</button>`;
  ligne.querySelector("button").addEventListener("click", () => ligne.remove());
  listeAttributs.append(ligne);
}

// Construit le document à partir du formulaire.
function lireFormulaire() {
  const attributs = {};
  for (const ligne of listeAttributs.querySelectorAll(".ligne-attribut")) {
    const cle = ligne.querySelector("[data-cle]").value.trim();
    const valeur = ligne.querySelector("[data-valeur]").value.trim();
    if (cle && valeur) attributs[cle] = valeur;
  }
  const compatibilites = $("#champ-compatibilites").value
    .split("\n").map((l) => l.trim()).filter(Boolean);

  return {
    nom: $("#champ-nom").value.trim(),
    marque: $("#champ-marque").value.trim(),
    categorie: $("#champ-categorie").value,
    prix: parseFloat($("#champ-prix").value) || 0,
    image: $("#champ-image").value.trim(),
    attributs,
    compatibilites,
  };
}

formProduit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const donnees = lireFormulaire();

  if (!donnees.nom || !donnees.categorie) {
    notifier("Le nom et la catégorie sont obligatoires.", "erreur");
    return;
  }

  const id = $("#champ-id").value;
  const btn = $("#btn-enregistrer");
  btn.disabled = true;

  try {
    if (id) {
      await modifierProduit(id, donnees);   // UPDATE Firestore
      notifier("Pièce mise à jour.", "ok");
    } else {
      await ajouterProduit(donnees);        // CREATE Firestore
      notifier("Pièce ajoutée au catalogue.", "ok");
    }
    dlgForm.close();
    charger();
  } catch (erreur) {
    console.error(erreur);
    notifier("L'enregistrement a échoué.", "erreur");
  } finally {
    btn.disabled = false;
  }
});

// ============================================================
// JEU DE DONNÉES DE DÉMONSTRATION
// ============================================================
$("#btn-demo").addEventListener("click", async () => {
  if (!confirm(`Ajouter ${DONNEES_DEMO.length} pièces de démonstration au catalogue ?`)) return;
  try {
    for (const piece of DONNEES_DEMO) await ajouterProduit(piece);
    notifier("Jeu de démonstration chargé !", "ok");
    charger();
  } catch (erreur) {
    console.error(erreur);
    notifier("Le chargement de la démo a échoué.", "erreur");
  }
});

// ---------- Démarrage ----------
basculerEcrans();
