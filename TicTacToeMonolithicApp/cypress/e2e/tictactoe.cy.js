// Cypress end-to-end UI tests for Tic Tac Toe app

describe('Tic Tac Toe App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders board and allows users to play a full game with a winner', () => {
    // Ensure the board is rendered
    cy.findByRole('grid').should('exist');
    cy.findAllByRole('gridcell').should('have.length', 9);

    // Play X win (top row)
    cy.findAllByRole('gridcell').eq(0).click();
    cy.findAllByRole('gridcell').eq(3).click();
    cy.findAllByRole('gridcell').eq(1).click();
    cy.findAllByRole('gridcell').eq(4).click();
    cy.findAllByRole('gridcell').eq(2).click();

    cy.contains('Winner: X').should('be.visible');
    // Highlighted squares have custom style
    cy.findAllByRole('gridcell').eq(0).should('have.class', 'highlight');
    cy.findAllByRole('gridcell').eq(1).should('have.class', 'highlight');
    cy.findAllByRole('gridcell').eq(2).should('have.class', 'highlight');
  });

  it('detects a draw game', () => {
    // X O X
    // X X O
    // O X O
    const moves = [0,1,2,5,3,4,7,6,8];
    moves.forEach(i => cy.findAllByRole('gridcell').eq(i).click());
    cy.contains("It's a Draw!").should('be.visible');
  });

  it('can restart/resets the game', () => {
    cy.findAllByRole('gridcell').eq(0).click();
    cy.findByRole('button', { name: /restart/i }).click();
    cy.findAllByRole('gridcell').each(($el) => {
      cy.wrap($el).should('be.empty');
    });
    cy.contains('Player Turn').should('be.visible');
  });

  it('is accessible by tab and has correct aria-labels', () => {
    // Tab focus cycles through squares in order
    cy.get('body').tab();
    cy.focused().should('have.class', 'theme-toggle');
    cy.focused().tab();
    cy.focused().tab();
    cy.focused().tab();

    // All gridcells have aria-labels correctly
    cy.findAllByRole('gridcell').each(($el, idx) => {
      cy.wrap($el)
        .should('have.attr', 'aria-label')
        .and('contain', 'Row');
    });
  });

  it('supports theme switching', () => {
    cy.findByRole('button', { name: /dark/i }).click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.findByRole('button', { name: /light/i }).click();
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });
});
