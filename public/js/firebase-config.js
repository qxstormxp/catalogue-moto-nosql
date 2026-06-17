// ============================================================
// CONFIGURATION FIREBASE — projet « catalogue-moto »
// ------------------------------------------------------------
// Le SDK est importé via CDN (aucun build, aucun npm requis).
//
// ℹ️ La clé apiKey d'une app web Firebase n'est PAS un secret :
//    elle ne fait qu'identifier le projet. Ce sont les RÈGLES
//    DE SÉCURITÉ Firestore (onglet « Règles » dans la console,
//    voir aussi firestore.rules) qui protègent réellement les
//    données. Il est donc normal qu'elle figure dans ce fichier.
//
// ℹ️ Analytics n'est pas utilisé par le catalogue : on initialise
//    uniquement Firestore. Le champ measurementId est conservé
//    dans la config (sans effet) au cas où.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2LH7udsksSR0Y8ojGZH8GxynwsI03Ekg",
  authDomain: "catalogue-moto.firebaseapp.com",
  projectId: "catalogue-moto",
  storageBucket: "catalogue-moto.firebasestorage.app",
  messagingSenderId: "519963492231",
  appId: "1:519963492231:web:538ffc82f55d05dd0e1d22",
  measurementId: "G-QD3HB713WL",
};

// Initialisation de l'application Firebase…
const app = initializeApp(firebaseConfig);

// …puis de Firestore, exporté pour être utilisé partout (api.js).
export const db = getFirestore(app);
