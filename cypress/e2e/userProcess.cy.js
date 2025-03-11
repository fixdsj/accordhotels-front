describe('User process', () => {
    it('should create, logout, login, and delete an account', () => {
        const timestamp = new Date().getTime();
        const uniqueUser = `cypresstestuser${timestamp}`;
        const uniqueEmail = `cypresstestuser${timestamp}@example.com`;


        // Inscription
        cy.visit('/register');
        cy.get('input[name="pseudo"]').type(uniqueUser);
        cy.get('input[name="email"]').type(uniqueEmail);
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
        cy.get('input[name="terms"]').check();
        cy.get('button[type="submit"]').click();

        cy.url().should('eq', Cypress.config().baseUrl + '/');

        // Vérifiez que le jeton est bien stocké dans le localStorage ou les cookies
        cy.window().then((win) => {
            const token = win.localStorage.getItem('token');
            expect(token).to.not.be.null;
        });

        // Vérifiez que l'utilisateur est connecté
        cy.get('button:contains("Mon compte")').should('be.visible');


        // Déconnexion
        cy.get('[data-cy="logout-icon"]').click();


        // Vérifiez que l'utilisateur est déconnecté
        cy.get('button:contains("Connexion")').should('be.visible');

        // Connexion
        cy.get('button:contains("Connexion")').click();
        cy.get('input[name="email"]').type(uniqueEmail);
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.url().should('eq', Cypress.config().baseUrl + '/');
        cy.window().then((win) => {
            const token = win.localStorage.getItem('token');
            expect(token).to.not.be.null;
        });
        cy.get('button:contains("Mon compte")').click();
        cy.get('button:contains("Mes informations")').click();


        //Modification des informations
        cy.get('input[name="pseudo"]').type('test');

        cy.get('button:contains("Enregistrer")').click();
        cy.get('button:contains("Mon compte")').click();

        //Suppression du compte
        cy.get('button:contains("Supprimer mon compte")').click();

        cy.url().should('eq', Cypress.config().baseUrl + '/');

    });
});