# Akkor Hotel Website

Ceci est un site web pour un hôtel fictif appelé Akkor Hotel. Le site est conçu pour être responsive et convivial.

## Installation
Pour installer le projet, vous devez avoir Docker d'installé et d'ouvert. Ensuite, suivez les étapes suivantes:
Pour utiliser le site, vous devez avoir lancé l'API. Pour cela, suivez les instructions du [README de l'API](https://github.com/fixdsj/accordhotels-back/blob/master/README.md).

1. Cloner le repository:
    ```sh
    git clone https://github.com/fixdsj/accordhotels-front.git
    cd accordhotels-front
    ```

2. Créer un fichier `.env` à la racine du projet et ajouter les variables suivantes:
    ```sh
    VITE_API_URL=http://localhost:3000/api
    ```
3. Lancez le projet:
    ```sh
    docker compose up --build -d
    ```
4. Ouvrez votre navigateur et allez à l'adresse `http://localhost`.


6. Pour arrêter le projet, utilisez la commande:
    ```sh
    docker compose down
    ```
## Lancer les tests
Pour lancer les tests, vous devez etre en mode developpement. Pour cela, suivez les étapes suivantes:
Prérerequis: Vous devez avoir Node.js et npm installés et avoir lancé l'API.

1. Clonez le repository:
    ```sh
    git clone https://github.com/fixdsj/accordhotels-front.git
    cd accordhotels-front
    ```
2. Installer les dépendances:
    ```sh
    npm install
    ```
3. Lancer le serveur de développement:
    ```sh
    npm run dev
    ```
4. Lancer les tests:
    ```sh
    npx cypress run
    ```
5. Pour voir les tests en mode graphique, utilisez la commande:
    ```sh
    npx cypress open
    ```
