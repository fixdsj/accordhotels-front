describe('Booking process', () => {
    it('should booking make a reservation', () => {
        const timestamp = new Date().getTime();
        const uniqueUser = `cypresstestuser${timestamp}`;
        const uniqueEmail = `cypresstestuser${timestamp}@example.com`;

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

        // Rechercher un hôtel
        cy.get('#destination').type('Paris');
        cy.get("button[type='submit']").click();

        // Sélectionner le premier hôtel de la liste
        cy.get('.mt-6:first > .bg-indigo-600').click();
        cy.url().should('include', '/booking/');

        // Sélectionner des dates et le nombre de personnes
        const firstDate = new Date();
        firstDate.setDate(firstDate.getDate() + 1);

        const secondDate = new Date();
        secondDate.setDate(firstDate.getDate() + 3);

        cy.get('input[type="date"]').eq(0).type(firstDate.toISOString().split('T')[0]);
        cy.get('input[type="date"]').eq(1).type(secondDate.toISOString().split('T')[0]);

        cy.get('input[type="number"]').type('2');

        // Vérifier que le prix est correct dans le bouton de réservation
        cy.get('button').should('not.be.disabled', false);
        cy.get('button').should('contain', 'Réserver pour');

        // Réserver l'hôtel
        cy.get('button:contains("Réserver")').click();
        cy.url().should('include', 'success');

        // Vérifier que la réservation a été effectuée dans le compte utilisateur
        cy.get('button:contains("Mon compte")', {timeout: 10000}).click();
        cy.get('button:contains("Mes réservations")').should('be.visible');
        cy.url().should('eq', Cypress.config().baseUrl + '/account');

        // Vérifier que la réservation est visible dans la liste des réservations
        cy.get('main').should('have.length', 1);
        cy.get('main:first').should('contain', 'Paris');
        cy.get('main:first').should('contain', 'Nombre de personnes');
        cy.get('main:first').should('contain', 'Date d\'arrivée');
        cy.get('main:first').should('contain', 'Date de départ');
        cy.get('main:first').should('contain', 'Prix total');


        //Supprimer le compte utilisateur
        cy.get('button:contains("Mes informations")').click();
        cy.get('button:contains("Supprimer mon compte")').click();

        cy.url().should('eq', Cypress.config().baseUrl + '/');
    }
    );
});