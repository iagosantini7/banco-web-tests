describe('Transferencias', () => {
    beforeEach(() => {
        //Arrange
        cy.visit('/')
        cy.fixture('credencias').then(credencias => {
            cy.get('#username').click().type(credencias.valida.usuario)
            cy.get('#senha').click().type(credencias.valida.senha)
        })
        cy.contains('button', 'Entrar').click()
    })
    it('Deve tansferir quando informor dados e valor validos', () => {
        cy.get('label[for="conta-origem"]').parent().as('campo-conta-origem')
        cy.get('@campo-conta-origem').click()
        cy.get('@campo-conta-origem').contains('João da Silva').click();

        cy.get('label[for="conta-destino"]').parent().as('campo-conta-destino')
        cy.get('@campo-conta-destino').click()
        cy.get('@campo-conta-destino').contains('Maria Oliveira').click();

        cy.get('#valor').click().type(11.00)
        cy.contains('button', 'Transferir').click()
        cy.get('.toast').should('have.text', 'Transferência realizada!')
    })
})