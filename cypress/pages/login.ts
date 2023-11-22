require('cypress-xpath');
var login={
    textLoginToYourAccount:()=>
    {
        return cy.xpath('//h2[text()="Log in to your Account"]')
    },
    username:()=>
    {
        return cy.xpath('//input[@name="username"]')
    },
    password:()=>
    {
        return cy.xpath('//input[@name="password"]')
    },
    btnSignIn:()=>
    {
        return cy.get('.col-md-12 > .butn')
    }

} 
export default login;