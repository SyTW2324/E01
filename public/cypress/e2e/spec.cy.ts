import { describe } from 'mocha'

describe('template spec', () => {
  it('login', () => {
    cy.visit('http://localhost:5173/login')

    cy.wait(1000);
    cy.get('input[type="email"]').type('me@migueldorta.com');
    cy.get('input[type="password"]').type('1q2w3e4r');
    cy.get('button[type="submit"]').click();
    //cy.request('http://localhost:7480/api/auth/').its('status').should('be.equal', 200);
  })
  it('register', () => {
    cy.visit('http://localhost:5173/register')

    cy.wait(1000);
    cy.get('input[id="name"]').type('LucasPR');
    cy.get('input[id="email"]').type('me@lucaspr.com');
    cy.get('input[id="password"]').type('q1w2e3r4');
    cy.get('input[id="password-confirmation"]').type('q1w2e3r4');
    cy.get('button[type="submit"]').click();
  })

  it('invalid login', () => {
    cy.visit('http://localhost:5173/login')

    cy.wait(1000);
    cy.get('input[type="email"]').type('me@migueldorta.com');
    cy.get('input[type="password"]').type('1q2w');
    cy.get('button[type="submit"]').click();
  })
  it('invalid register user already exist', () => {
    cy.visit('http://localhost:5173/register')

    cy.wait(1000);
    cy.get('input[id="name"]').type('LucasPR');
    cy.get('input[id="email"]').type('me@lucaspr.com');
    cy.get('input[id="password"]').type('q1w2e3r4');
    cy.get('input[id="password-confirmation"]').type('q1w2e3r4');
    cy.get('button[type="submit"]').click();
  })  
  it('invalid register not macth passwords', () => {
    cy.visit('http://localhost:5173/register')

    cy.wait(1000);
    cy.get('input[id="name"]').type('LucasPR');
    cy.get('input[id="email"]').type('me@lucaspr.com');
    cy.get('input[id="password"]').type('q1w2e3r4');
    cy.get('input[id="password-confirmation"]').type('other');
    cy.get('button[type="submit"]').click();
  }) 
  
})
