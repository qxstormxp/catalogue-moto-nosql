// ============================================================
// AUTHENTIFICATION DE L'ESPACE D'ADMINISTRATION
// ------------------------------------------------------------
// Principe : un mot de passe unique protège la page de gestion.
// Le mot de passe n'apparaît JAMAIS en clair dans le code :
// on ne stocke que son EMPREINTE SHA-256. À la connexion, on
// hache la saisie (API native crypto.subtle) et on compare les
// deux empreintes. La session est gardée dans sessionStorage :
// elle disparaît à la fermeture de l'onglet.
//
// ⚠️ Limite assumée (à savoir expliquer en soutenance) :
// c'est une protection de l'INTERFACE, côté navigateur. Les
// règles Firestore restant ouvertes en écriture pendant le
// projet, un utilisateur outillé pourrait écrire via le SDK.
// La version production passerait par Firebase Authentication
// + règle « allow write: if request.auth != null ».
//
// ℹ️ crypto.subtle exige un contexte sécurisé : https ou
// localhost — c'est le cas en développement comme en ligne.
// ============================================================

// Empreinte SHA-256 du mot de passe d'administration.
// (Pour la changer : hacher le nouveau mot de passe et coller
//  l'empreinte ici — voir le README, section « Espace admin ».)
const EMPREINTE_ADMIN =
  "7bd4b8e2d7504a5938e7e4efa2174700160fb5a569374807da60403ed6f807c0";

const CLE_SESSION = "motoparts_admin";

// Calcule l'empreinte SHA-256 hexadécimale d'un texte.
export async function sha256(texte) {
  const octets = new TextEncoder().encode(texte);
  const tampon = await crypto.subtle.digest("SHA-256", octets);
  return [...new Uint8Array(tampon)]
    .map((o) => o.toString(16).padStart(2, "0"))
    .join("");
}

// Tente la connexion : vrai si le mot de passe est correct.
export async function connecter(motDePasse) {
  const ok = (await sha256(motDePasse)) === EMPREINTE_ADMIN;
  if (ok) sessionStorage.setItem(CLE_SESSION, "1");
  return ok;
}

// L'utilisateur est-il connecté dans cet onglet ?
export function estConnecte() {
  return sessionStorage.getItem(CLE_SESSION) === "1";
}

// Ferme la session admin.
export function deconnecter() {
  sessionStorage.removeItem(CLE_SESSION);
}
