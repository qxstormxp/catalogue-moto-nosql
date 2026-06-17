// ============================================================
// JEU DE DONNÉES DE DÉMONSTRATION
// ------------------------------------------------------------
// 10 pièces réparties sur plusieurs catégories pour montrer
// la force du modèle document : les « attributs » changent
// d'une catégorie à l'autre, sans modifier aucun schéma.
//
// Les images utilisent placehold.co (service de placeholders) :
// remplacez-les librement par de vraies URL de photos produits.
// ============================================================

const IMG = (texte, couleur = "f4581c") =>
  `https://placehold.co/600x400/1a2228/${couleur}?text=${texte}`;

export const DONNEES_DEMO = [
  {
    nom: "Plaquettes de frein avant",
    categorie: "Freinage",
    marque: "Brembo",
    prix: 39.9,
    image: IMG("Plaquettes+Brembo"),
    attributs: { matiere: "céramique", position: "avant" },
    compatibilites: ["Yamaha MT-07 (2018+)", "Honda CB650R"],
  },
  {
    nom: "Disque de frein flottant 320 mm",
    categorie: "Freinage",
    marque: "EBC",
    prix: 89.0,
    image: IMG("Disque+EBC", "9fb4c7"),
    attributs: { diametre: "320 mm", position: "avant", type: "flottant" },
    compatibilites: ["Kawasaki Z900", "Kawasaki Z650"],
  },
  {
    nom: "Pneu arrière Power 6",
    categorie: "Pneumatique",
    marque: "Michelin",
    prix: 159.9,
    image: IMG("Pneu+Michelin"),
    attributs: { dimension: "180/55 ZR17", saison: "été", usage: "sport" },
    compatibilites: ["Yamaha MT-09", "Suzuki GSX-S750", "Triumph Street Triple"],
  },
  {
    nom: "Pneu avant Road 6",
    categorie: "Pneumatique",
    marque: "Michelin",
    prix: 129.0,
    image: IMG("Pneu+Road+6", "9fb4c7"),
    attributs: { dimension: "120/70 ZR17", saison: "toutes saisons", usage: "sport-touring" },
    compatibilites: ["Honda CB650R", "Yamaha Tracer 7"],
  },
  {
    nom: "Kit chaîne 525 ZVM-X",
    categorie: "Transmission",
    marque: "DID",
    prix: 149.9,
    image: IMG("Kit+chaine+DID"),
    attributs: { pas: "525", maillons: 118, joints: "X-ring" },
    compatibilites: ["Yamaha MT-09 (2021+)"],
  },
  {
    nom: "Couronne acier 45 dents",
    categorie: "Transmission",
    marque: "JT Sprockets",
    prix: 34.5,
    image: IMG("Couronne+JT", "9fb4c7"),
    attributs: { dents: 45, matiere: "acier", pas: "520" },
    compatibilites: ["Kawasaki Z650", "Kawasaki Ninja 650"],
  },
  {
    nom: "Filtre à air haute performance",
    categorie: "Filtration",
    marque: "K&N",
    prix: 64.9,
    image: IMG("Filtre+K%26N"),
    attributs: { type: "coton lavable", reutilisable: "oui" },
    compatibilites: ["Honda CB500F", "Honda CBR500R"],
  },
  {
    nom: "Filtre à huile HF204",
    categorie: "Filtration",
    marque: "Hiflofiltro",
    prix: 9.9,
    image: IMG("Filtre+huile", "9fb4c7"),
    attributs: { reference: "HF204", type: "cartouche vissable" },
    compatibilites: ["Honda", "Kawasaki", "Yamaha", "Triumph (nombreux modèles)"],
  },
  {
    nom: "Silencieux slip-on titane",
    categorie: "Échappement",
    marque: "Akrapovič",
    prix: 549.0,
    image: IMG("Echappement+Akrapovic"),
    attributs: { matiere: "titane", homologue: "oui (CE)", gain_poids: "-2,1 kg" },
    compatibilites: ["Yamaha MT-07 (2021+)"],
  },
  {
    nom: "Ampoule LED H4 Ultinon",
    categorie: "Éclairage",
    marque: "Philips",
    prix: 49.9,
    image: IMG("LED+H4+Philips", "9fb4c7"),
    attributs: { culot: "H4", flux: "1700 lm", temperature: "5800 K" },
    compatibilites: ["Universel (optique H4)"],
  },
];
