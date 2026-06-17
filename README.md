# 🏍️ MotoParts — Catalogue de pièces détachées moto (NoSQL)

Application web de catalogue pour une boutique de pièces moto, construite sur
**Firebase Cloud Firestore** (base documentaire NoSQL). Le navigateur dialogue
directement avec la base via le SDK officiel : **aucun back-end**.

> **Démo en ligne :** [URL à compléter après déploiement]

| Binôme | Branche | Périmètre |
|---|---|---|
| Gauvin CAILLOU | `feature/crud-firestore` | Firestore, CRUD, modèle de données, auth admin |
| Alessio COGERINO | `feature/interface` | UI, recherche/filtre, design, déploiement |

---

## ✨ Fonctionnalités

**Site public (`index.html`) — lecture seule**
- Liste des pièces en grille responsive, triée par nom
- Recherche instantanée par mot-clé (nom, marque)
- Filtre par catégorie → **vraie requête Firestore (`where`)**
- Fiche technique : caractéristiques **variables selon la catégorie** + compatibilités motos

**Espace d'administration (`admin.html`) — protégé par mot de passe**
- Ajouter / modifier / supprimer une pièce (CRUD complet)
- Formulaire à attributs dynamiques (lignes clé/valeur libres)
- Chargement d'un jeu de démonstration (10 pièces réalistes)

## 🔐 Espace admin

- URL : `/admin.html` (lien « Administration » dans l'en-tête du site)
- **Mot de passe : `azerty89$`** *(laissé volontairement dans ce README pour la
  correction du projet — à retirer pour un usage réel)*
- Le mot de passe **n'apparaît jamais en clair dans le code** : seul son
  **hash SHA-256** est stocké (`js/auth.js`). À la connexion, la saisie est
  hachée avec l'API native `crypto.subtle` puis comparée. La session vit dans
  `sessionStorage` : elle se ferme avec l'onglet.
- Pour changer le mot de passe : dans la console du navigateur,
  `await sha256("nouveauMotDePasse")` (fonction exportée par `js/auth.js`),
  puis coller l'empreinte dans `EMPREINTE_ADMIN`.
- **Limite assumée** (question probable en soutenance) : c'est une protection
  de l'*interface*, côté client. Les règles Firestore restant ouvertes en
  écriture pendant le projet, la version production utiliserait
  **Firebase Authentication** + `allow write: if request.auth != null`.

## 🎨 Décor 3D animé

Le fond animé (braises d'atelier qui montent + deux disques de frein qui
tournent en perspective) est un **moteur maison, sans aucune librairie**
(`js/scene3d.js`). Il manipule de vraies coordonnées 3D `(x, y, z)`, applique
une rotation, puis une **projection perspective** pour calculer la position à
l'écran ; le rendu se fait sur un `<canvas>`. Aucune dépendance, donc rien à
charger depuis un CDN : c'est instantané et entièrement explicable en
soutenance. Il se met en pause quand l'onglet est masqué et respecte
`prefers-reduced-motion` (image fixe pour qui désactive les animations).

## 📦 Modèle de données

Collection unique `produits` — un document par pièce :

```json
{
  "nom": "Plaquettes de frein avant",
  "categorie": "Freinage",
  "marque": "Brembo",
  "prix": 39.90,
  "image": "https://exemple.com/plaquettes.jpg",
  "attributs": { "matiere": "céramique", "position": "avant" },
  "compatibilites": ["Yamaha MT-07 (2018+)", "Honda CB650R"]
}
```

L'objet `attributs` accepte des **clés libres** : un pneu et des plaquettes
n'ont pas la même structure, sans migration de schéma — c'est l'intérêt du
modèle document.

## 🗂️ Structure

```
public/
├── index.html          → site public (liste, recherche, filtre, fiche)
├── admin.html          → espace gestion (connexion + CRUD)
├── css/style.css       → thème « atelier nocturne »
└── js/
    ├── firebase-config.js  → ⚠️ votre configuration Firebase ici
    ├── api.js              → CRUD Firestore partagé (1 seule fois)
    ├── auth.js             → mot de passe (hash SHA-256 + session)
    ├── app.js              → logique de la page publique
    ├── admin.js            → logique de la page admin
    └── donnees-demo.js     → 10 pièces de démonstration
firestore.rules         → règles de sécurité Firestore
firebase.json           → config Firebase Hosting
docs/                   → CDC, slides, guides (Trello, Git, déploiement…)
maquettes/              → wireframes des écrans
```

## 🚀 Lancer le projet

### 1. Créer le projet Firebase (une fois)
1. [console.firebase.google.com](https://console.firebase.google.com) →
   « Ajouter un projet » (Analytics inutile)
2. « Ajouter une application » → icône **Web `</>`** → copier `firebaseConfig`
3. Coller la config dans `public/js/firebase-config.js`
4. Menu **Firestore Database** → « Créer une base de données » →
   **mode test** → région `europe-west9` (Paris)

### 2. Lancer en local
Les modules ES exigent un serveur HTTP (le double-clic sur le fichier ne
fonctionne pas) :

```bash
cd public
python -m http.server 8000
# → http://localhost:8000
```

### 3. Remplir la base
Ouvrir `http://localhost:8000/admin.html`, se connecter, puis
**« Charger le jeu de démo »**.

## 🌍 Déploiement

Voir `docs/03-deploiement.md` : Hostinger (contenu de `public/` dans
`public_html/`), Netlify, Vercel ou Firebase Hosting (`firebase deploy`).

## 🛠️ Stack

HTML5 · CSS3 · JavaScript natif (modules ES) · SDK Firebase **v12.14.0** via
CDN · Cloud Firestore · aucun build, aucun framework.
