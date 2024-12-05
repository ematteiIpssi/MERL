# MERN Marketplace Project

Une application web complète inspirée de **Le Bon Coin**, construite avec la stack MERN (MongoDB, Express, React, Node.js).

## Fonctionnalités

- **Authentification sécurisée** :
  - Inscription et connexion avec `JWT` et `bcrypt`.
  - Gestion des tokens pour les routes protégées.

- **Gestion des utilisateurs** :
  - Voir, créer, modifier et supprimer des utilisateurs.
  - Pagination pour une navigation fluide.

- **Gestion des annonces** :
  - Voir, créer, modifier et supprimer des annonces.
  - Filtrage des annonces par catégories.
  - Pagination pour une meilleure expérience utilisateur.

---

## Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [MongoDB](https://www.mongodb.com/) (local ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

---

## Installation

### 1. Clonez le dépôt

git clone <URL_DU_DEPOT>
cd <NOM_DU_DEPOT>

### 2. Configuration backend

cd backend
npm install

Créez un fichier .env dans le dossier backend.

Ajoutez les configurations suivantes :

Copier le code
#### Configuration de l'Application
PORT=5000

#### MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

#### JWT Secret
JWT_SECRET=votre_clé_secrète_pour_jwt
npm start

### 3. Configuration Frontend
cd ../frontend
Installez les dépendances :

bash
Copier le code
npm install
Configurez la connexion au backend :

Ouvrez le fichier src/config.js (ou créez-le si nécessaire).

Ajoutez les informations suivantes :

javascript
Copier le code
const config = {
    apiUrl: 'http://localhost:5000/api',
};

export default config;
Explications :

apiUrl : L'URL de base pour les appels API du frontend au backend.
Lancez le frontend :

bash
Copier le code
npm start