/// <reference types="cypress-xpath" />
var home={
    clTrendingCourses:(courseNum)=>
    {
        return cy.xpath(`//div[2]/div[2]/div[${courseNum}]/div/div[2]/div[2]/a[text()="Enroll Now "]`)
    },
    textLoginToYourAccount:()=>
    {
        return cy.xpath('//h2[text()="Log in to your Account"]')
    },
    

    

}
export default home;