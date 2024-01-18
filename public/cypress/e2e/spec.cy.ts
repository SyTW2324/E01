import { describe } from 'mocha'

describe('template spec', () => {
  it('login', () => {
    cy.visit('https://sharethecost.dorta.win/login')

    cy.wait(1000);
    cy.get('input[id="login-email"]').type('lpr@me.com');
    cy.get('input[id="login-pass"]').type('123456789Abcd@');
    cy.get('button[type="button"]').click();
    
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

    const alertShown = cy.stub().as("alertShown")
    cy.wait(1000);
    cy.on ('window:alert', alertShown)
    cy.wait(1000);
    cy.get('button[type="button"]').click()
    cy.wait(1000);
    cy.get("@alertShown").should("have.been.calledOnceWith")

  })
  it('invalid register user already exist', () => {
    cy.visit('https://sharethecost.dorta.win/register')

    cy.wait(1000);
    cy.get('input[id="register-name"]').type('LucasPR');
    cy.get('input[id="register-email"]').type('lpr@me.com');
    cy.get('input[id="register-pass"]').type('123456789Abcd@');
    cy.get('input[id="register-pass-confirm"]').type('123456789Abcd@');
    const alertShown = cy.stub().as("alertShown")
    cy.wait(1000);
    cy.on ('window:alert', alertShown)
    cy.wait(1000);
    cy.get('button[type="button"]').click()
    cy.wait(1000);
    cy.get("@alertShown").should("have.been.calledOnceWith")
  })  
  it('invalid register not match passwords', () => {
    cy.visit('https://sharethecost.dorta.win/register')

    cy.wait(1000);
    cy.get('input[id="register-name"]').type('LucasPR');
    cy.get('input[id="register-email"]').type('me@lucasper.com');
    cy.get('input[id="register-pass"]').type('123456789Abcd@');
    cy.get('input[id="register-pass-confirm"]').type('other');
    cy.get('button[type="button"]').click()
  }) 
  
})
