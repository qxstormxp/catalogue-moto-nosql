# 🚀 Guide de déploiement

L'application est **100 % statique** (HTML/CSS/JS) : Firestore est appelé
directement depuis le navigateur. Déployer = **copier le contenu du dossier
`public/` chez un hébergeur**. Aucune configuration serveur, aucune base à
installer.

> ✅ Avant tout déploiement : `js/firebase-config.js` contient vos vraies
> clés, et l'app fonctionne en local.

---

## Option A — Hostinger (hébergement perso)

1. **hPanel** → votre hébergement → **Gestionnaire de fichiers**.
2. Ouvrir le dossier **`public_html/`** (vider les fichiers d'exemple).
3. **Importer** le CONTENU de `public/` : `index.html` doit se retrouver
   directement dans `public_html/` (pas dans un sous-dossier `public/`).
   - Astuce : zippez le contenu de `public/`, uploadez le zip, puis
     clic droit → *Extraire* dans `public_html/`.
4. Ouvrir votre domaine → l'app doit s'afficher. C'est tout.

*Variante FTP :* FileZilla avec les identifiants FTP du hPanel
(*Fichiers → Comptes FTP*), glisser-déposer le contenu de `public/` vers
`public_html/`.

---

## Option B — Netlify (gratuit, le plus rapide)

**Sans compte Git :** [app.netlify.com/drop](https://app.netlify.com/drop)
→ glisser-déposer le **dossier `public/`** → URL en ligne en 10 secondes.

**Depuis GitHub (se met à jour à chaque push sur `main`) :**
1. [app.netlify.com](https://app.netlify.com) → *Add new site → Import an
   existing project* → choisir le dépôt.
2. **Build command :** *(laisser vide)* — **Publish directory :** `public`
3. *Deploy*. Renommez le site : *Site settings → Change site name*.

---

## Option C — Vercel (gratuit)

1. [vercel.com](https://vercel.com) → *Add New → Project* → importer le dépôt GitHub.
2. **Framework Preset :** `Other` · **Root Directory :** `public`
3. *Deploy* → URL `https://votre-projet.vercel.app`.

---

## Option D — Firebase Hosting (celui du cours)

```bash
npm install -g firebase-tools
firebase login
cd catalogue-moto-nosql
firebase init hosting   # projet existant → dossier public : "public" → SPA : No
firebase deploy         # → https://votre-projet.web.app
```

*(le fichier `firebase.json` fourni est déjà prêt)*

---

## Vérifications après mise en ligne

- [ ] L'URL s'ouvre sur mobile **et** desktop
- [ ] La liste se charge (sinon : F12 → Console → souvent une erreur de
      config Firebase ou de règles Firestore)
- [ ] Ajout / modification / suppression fonctionnent en ligne
- [ ] L'URL est collée dans le README **et** sur la carte Trello « Références »
