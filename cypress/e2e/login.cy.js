describe('Login', () => {
  
  beforeEach(() => {
    //Arrange
    cy.visit('http://localhost:4000/')
    cy.screenshot('apos-visitar-pagina')
  })
  
  it('Login com dados validos deve permitir entrada no sistema', () => {
    //Act
    cy.fixture('credencias').then(credencias => {
      cy.get('#username').click()
      .type(credencias.valida.usuario)
      cy.get('#senha').click().type(credencias.valida.senha)
    })
    
    cy.screenshot('apos-preencher-com-dados-validos')
    cy.contains('button', 'Entrar').click()
    //Assert 
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

  it('Login com dados invalidos deve dar mensagem de erro', () => { 
    //Act
   cy.fixture('credencias').then(credencias => {
      cy.get('#username').click()
      .type(credencias.invalida.usuario)
      cy.get('#senha').click().type(credencias.invalida.senha)
    })
    //cy.get('#login-section > .btn').click()
    cy.contains('button', 'Entrar').click()
    //Assert 
    cy.get('.toast').should('be.visible')
    cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')
    
  })
})