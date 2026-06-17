# 📋 Organisation Trello — Catalogue Moto NoSQL

Créez un tableau **« Catalogue Moto NoSQL — [Binôme] »** sur
[trello.com](https://trello.com) (gratuit), invitez votre binôme
(*Menu → Partager*), puis recréez la structure ci-dessous.

> 💡 **Astuce rapide** : dans Trello, collez plusieurs lignes de texte dans
> le champ « Ajouter une carte » → Trello propose de créer **une carte par
> ligne**. Copiez-collez directement les blocs ci-dessous.

## Les listes (colonnes)

`📌 Références` · `📋 Backlog` · `🔜 À faire` · `🚧 En cours` · `🧪 À tester` · `✅ Terminé`

## Les étiquettes (labels)

🟦 **CDC & maquette** · 🟩 **Dev** · 🟧 **Déploiement** · 🟥 **Soutenance** · 🟨 **Git/Docs**

Assignez **chaque carte à un membre** : le jury doit voir la répartition du travail.

## Cartes — liste « 📌 Références »

```
Consignes du projet (PDF) + barème /20
Lien console Firebase
Lien dépôt GitHub
Lien application en ligne
```

## Cartes — liste « 📋 Backlog » (copier-coller tel quel)

```
Rédiger le cahier des charges (contexte, user stories, périmètre)
Définir le modèle de données (collection produits)
Maquette écran Liste (Google Stitch)
Maquette écran Détail (Google Stitch)
Maquette écran Formulaire (Google Stitch)
Créer le projet Firebase + activer Firestore (mode test)
Créer la collection produits + 1 document à la main
Page liste : affichage des pièces (nom, prix, image)
Vue détail : fiche technique (attributs + compatibilités)
Page admin : connexion par mot de passe (hash SHA-256)
Formulaire d'ajout (Create — addDoc)
Modification d'une pièce (Update — updateDoc)
Suppression d'une pièce (Delete — deleteDoc)
Filtre par catégorie (query + where)
Recherche par mot-clé
Jeu de données de démo (10 pièces)
Règles de sécurité Firestore
Responsive + états de chargement / vide
Créer le dépôt GitHub + branches (main + 2 features)
Rédiger le README
Déployer l'application + tester l'URL
Préparer les slides de soutenance
Répétition de la démo live (x2)
```

## Exemple de checklist dans une carte

Carte **« Formulaire d'ajout (Create) »** :
- [ ] Champs communs (nom, marque, catégorie, prix, image)
- [ ] Lignes dynamiques d'attributs (clé/valeur)
- [ ] Compatibilités (une par ligne)
- [ ] Validation (nom + catégorie obligatoires)
- [ ] `addDoc` + notification + rafraîchissement de la liste

## Rythme conseillé (4 semaines)

| Semaine | Objectif | Cartes concernées |
|---|---|---|
| 1 | Cadrage | CDC, modèle de données, maquettes, projet Firebase |
| 2 | Cœur de l'app | Liste, détail, Create, Read |
| 3 | Finitions | Update, Delete, filtre, recherche, règles |
| 4 | Livraison | Déploiement, README, slides, répétitions |

📸 **Faites des captures du tableau** à différents stades : preuve
d'organisation à glisser dans les slides de soutenance.
