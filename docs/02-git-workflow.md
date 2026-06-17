# 🌿 Workflow Git & GitHub — 3 branches, 2 contributeurs visibles

Objectif du livrable : un dépôt GitHub propre, des **commits réguliers et
explicites**, et les **contributions des DEUX membres visibles** via au
moins 2 branches de travail (+ `main` = **3 branches**).

## Stratégie de branches

```
main ──────●────────●──────────●────→  (version stable / déployée)
            \      /          /
feature/crud-firestore ●──●──●         (Gauvin : Firestore, CRUD, données)
              \                /
feature/interface ●──●──●──●──         (Alessio : UI, filtre, recherche, déploiement)
```

| Branche | Qui | Contenu |
|---|---|---|
| `main` | binôme | code stable uniquement, c'est elle qu'on déploie |
| `feature/crud-firestore` | Gauvin CAILLOU | config Firebase, app.js (CRUD), données de démo, règles |
| `feature/interface` | Alessio COGERINO | index.html, style.css, filtre/recherche, README, déploiement |

## Mise en place (une seule fois — Gauvin)

```bash
cd catalogue-moto-nosql
git init
git add .
git commit -m "chore: structure initiale du projet"
# Créer le dépôt vide "catalogue-moto-nosql" sur github.com puis :
git remote add origin https://github.com/VOTRE-COMPTE/catalogue-moto-nosql.git
git branch -M main
git push -u origin main
```

Puis **inviter le binôme** : GitHub → *Settings → Collaborators → Add people*.

## Travail au quotidien (chaque membre, sur SA branche)

```bash
# Gauvin                                  # Alessio
git checkout -b feature/crud-firestore    git checkout -b feature/interface
# ... coder ...                           # ... coder ...
git add js/app.js                         git add css/style.css
git commit -m "feat: ajout d'une pièce (addDoc)"
git push -u origin feature/crud-firestore
```

⚠️ Chacun pousse **depuis son propre compte GitHub** (vérifier
`git config user.name` et `user.email`), sinon un seul contributeur
apparaîtra dans l'historique.

## Ramener le travail dans `main` (Pull Request)

1. Sur GitHub : **Compare & pull request** depuis la branche feature.
2. L'**autre membre** relit et clique **Merge** (revue croisée = bon point).
3. Chacun se resynchronise ensuite :

```bash
git checkout main
git pull origin main
git checkout feature/ma-branche
git merge main        # récupère le travail de l'autre, résout les conflits ici
```

## Convention de messages de commit

`type: description courte à l'impératif`

| Type | Usage | Exemple |
|---|---|---|
| `feat` | nouvelle fonctionnalité | `feat: filtre par catégorie avec where()` |
| `fix` | correction de bug | `fix: prix non converti en nombre` |
| `style` | CSS / mise en forme | `style: responsive de la grille` |
| `docs` | README, CDC… | `docs: guide de déploiement Hostinger` |
| `chore` | config, outillage | `chore: ajout firestore.rules` |

## Checklist avant le rendu

- [ ] `main` contient la version déployée et fonctionne
- [ ] Au moins 3 branches visibles sur GitHub (main + 2 features)
- [ ] Commits des **deux** comptes dans *Insights → Contributors*
- [ ] README complet (présentation, lien en ligne, lancement)
- [ ] Pas de fichier inutile (`.DS_Store`, archives, etc.)
