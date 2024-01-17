import { describe } from 'mocha'

describe('template spec', () => {
  it('login', () => {
    cy.visit('https://sharethecost.dorta.win/login')

    cy.wait(2000);
    cy.get('input[id="login-email"]').type('lpr@me.com');
    cy.get('input[id="login-pass"]').type('123456789Abcd@');
    cy.get('button[type="button"]').click();
    //cy.request('https://sharethecost.dorta.win/api/auth/api/auth/').its('status').should('be.equal', 200);
  })
  it('register', () => {
    cy.visit('https://sharethecost.dorta.win/register')

    cy.wait(1000);
    cy.get('input[id="register-name"]').type('LucasPR');
    cy.get('input[id="register-email"]').type(`${new Date().getTime().toString(36)}@invalid.user`);
    cy.get('input[id="register-pass"]').type('123456789Abcd@');
    cy.get('input[id="register-pass-confirm"]').type('123456789Abcd@');
    cy.get('button[type="button"]').click();
  })

  it('invalid login', () => {
    cy.visit('https://sharethecost.dorta.win/login')

    cy.wait(1000);
    cy.get('input[id="login-email"]').type('me@mldorta.com');
    cy.get('input[id="login-pass"]').type('1q2wjjj');
    cy.on('window:alert', (mensaje) => {

      expect(mensaje).to.equal('Error: login: Invalid email or password');
    });

    cy.get('button[type="button"]').click();

  })
  it('invalid register user already exist', () => {
    cy.visit('https://sharethecost.dorta.win/register')

    cy.wait(1000);
    cy.get('input[id="register-name"]').type('LucasPR');
    cy.get('input[id="register-email"]').type('me@lucaspr.com');
    cy.get('input[id="register-pass"]').type('q1w2e3r4');
    cy.get('input[id="register-pass-confirm"]').type('q1w2e3r4');
    cy.get('button[type="button"]').click();
  })  
  it('invalid register not macth passwords', () => {
    cy.visit('https://sharethecost.dorta.win/register')

    cy.wait(1000);
    cy.get('input[id="register-name"]').type('LucasPR');
    cy.get('input[id="register-email"]').type('me@lucasper.com');
    cy.get('input[id="register-pass"]').type('123456789Abcd@');
    cy.get('input[id="register-pass-confirm"]').type('other');
    cy.get('button[type="button"]').click();
  }) 
  
})
