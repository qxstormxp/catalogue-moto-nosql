# 🎤 Préparation de la soutenance

**Règle d'or du module : vous devez savoir expliquer TOUT votre code,
y compris ce qui a été généré par IA.** Un code non défendu = 0 point.
Ce document vous prépare aux questions du jury.

## Déroulé conseillé (≈ 15 min)

| Temps | Qui | Quoi |
|---|---|---|
| 2 min | Gauvin | Contexte, besoin, périmètre |
| 3 min | Alessio | Choix techniques : pourquoi NoSQL, modèle de données |
| 5 min | les deux | **Démo live** (voir scénario ci-dessous) |
| 3 min | Gauvin | Zoom code (CRUD) + auth admin + sécurité + Git/Trello |
| 2 min | Alessio | Difficultés, bilan, perspectives |

## Scénario de démo live (à répéter 2 fois minimum)

1. Ouvrir **l'URL en ligne** (pas localhost !) — catalogue déjà rempli
   avec le jeu de démo.
2. **Parcours visiteur** : parcourir la liste → filtrer « Freinage » →
   rechercher « michelin » → ouvrir une **fiche technique** (montrer que
   les attributs changent selon la catégorie).
3. **Parcours gestion** : cliquer « Administration » → tester d'abord un
   **mauvais mot de passe** (montrer le refus) → se connecter avec le bon
   (`azerty89$`) → ajouter une pièce (ex. « Levier d'embrayage », avec
   2 attributs) → la modifier (changer le prix) → la supprimer.
4. Bonus : ouvrir la **console Firebase** à côté et montrer le document
   créé en direct dans la collection `produits`.

**Plan B si le Wi-Fi lâche :** version locale lancée d'avance +
captures d'écran dans les slides.

## Questions probables du jury — et les réponses

**« Pourquoi NoSQL plutôt que SQL ici ? »**
Nos produits sont hétérogènes : une plaquette et un pneu n'ont pas les
mêmes caractéristiques. En SQL il faudrait des dizaines de colonnes vides,
une table EAV illisible ou une table par catégorie. Le modèle document
laisse chaque pièce porter ses propres `attributs`, sans migration de schéma.

**« C'est quoi un document ? une collection ? »**
Un document = un objet JSON identifié par un id (≈ une ligne enrichie) ;
une collection = un ensemble de documents pas forcément identiques
(≈ une table sans schéma imposé).

**« Pourquoi pas de jointures ? »**
On imbrique ce qui se lit ensemble : les compatibilités appartiennent à la
pièce, on les stocke dedans (`compatibilites: [...]`). Une lecture = toute
la fiche. On référencerait seulement une donnée partagée et modifiée
souvent (ex. un stock par entrepôt).

**« Comment marche votre filtre par catégorie ? »**
On construit une vraie requête Firestore :
`query(collection(db,"produits"), where("categorie","==","Freinage"))`
puis `getDocs`. C'est l'équivalent du WHERE en SQL.

**« Et la recherche par mot-clé ? »**
Firestore n'a pas de recherche plein-texte native. À notre échelle
(catalogue de boutique), on filtre côté client avec `Array.filter` sur
nom/marque/catégorie. Pour des milliers de produits, on brancherait un
moteur dédié (Algolia, Typesense).

**« Pourquoi triez-vous côté client ? »**
Combiner `where` sur un champ et `orderBy` sur un autre exige un index
composite Firestore. Un `sort()` JS après chargement est plus simple et
suffisant ici — et on sait l'expliquer.

**« Vos règles de sécurité ? »**
Lecture publique (`allow read: if true`) car c'est un catalogue. Écriture
ouverte pour la durée du projet ; en production on exigerait
`request.auth != null` avec Firebase Auth (c'est le bonus identifié).
La clé `apiKey` n'est pas un secret : ce sont les règles qui protègent.

**« async/await, ça sert à quoi ? »**
Les appels réseau vers Firestore sont asynchrones. `await` met la fonction
en pause jusqu'à la réponse, sans bloquer la page ; `try/catch` capture les
erreurs (ex. règles refusées) pour afficher une notification.

**« Que stocke le champ image ? »**
Une URL (texte), pas le fichier : le stockage de fichiers Firebase exige
désormais une carte bancaire, et servir les images depuis un CDN externe
est un pattern courant. On reste concentrés sur la donnée.

**« Comment avez-vous travaillé à deux ? »**
Trello en kanban pour les tâches ; GitHub avec 3 branches : `main` stable,
une branche feature par membre, fusion par Pull Request relue par l'autre.

**« Limites / améliorations ? »**
Auth pour protéger l'écriture, upload d'images, tri et multi-filtres,
pagination Firestore (`limit` + `startAfter`) si le catalogue grossit,
voire un back-end Node + MongoDB (piste bonus du module).

## Check matériel avant de passer

- [ ] URL en ligne testée le matin même + jeu de démo en place
- [ ] Console Firebase ouverte dans un onglet (connecté !)
- [ ] Slides + plan B hors-ligne sur une clé USB
- [ ] Chacun sait expliquer les fichiers de l'AUTRE


### « Comment fonctionne votre mot de passe admin ? Est-ce sécurisé ? »
> Le mot de passe n'est **jamais en clair dans le code** : on stocke son
> **empreinte SHA-256** (`js/auth.js`). À la connexion, la saisie est hachée
> avec l'API native `crypto.subtle` et comparée à l'empreinte ; la session
> vit dans `sessionStorage`, donc se ferme avec l'onglet. **Limite assumée :**
> c'est une protection de l'*interface*, côté client — les règles Firestore
> restant ouvertes en écriture pendant le projet, un utilisateur outillé
> pourrait écrire via le SDK. En production : **Firebase Authentication** +
> `allow write: if request.auth != null` pour protéger la base elle-même.
