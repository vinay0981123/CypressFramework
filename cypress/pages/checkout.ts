var checkout={
btnPay:()=>
{
    return cy.get('.row > .btn')
},
cardNumber:()=>
{
    return cy.xpath('//input[@name="card[number]"]')
},
expiryDate:()=>
{
    return cy.xpath('//input[@name="card[expiry]"]')
},
cvv:()=>
{
    return cy.xpath('//input[@name="card[cvv]"]')
},
cardHolderName:()=>
{
    return cy.xpath('//input[@name="card[name]"]')
},
btnPayNow:()=>
{
    return cy.xpath('//button[@id="pay-now"]')
},
OTP:()=>
{
    return cy.get('#OTPActionArea > #otpForm > input')
},
btnSubmit:()=>
{
    return cy.get('#submit-action > span')
},
firstName:()=>
    {
        return cy.xpath('//input[@name="first_name"]')
    },
    LastName:()=>
    {
        return cy.xpath('//input[@name="last_name"]')
    },
    Address1:()=>
    {
        return cy.xpath('//input[@name="address1"]')
    },
    Address2:()=>
    {
        return cy.xpath('//input[@name="address2"]')
    },
    City:()=>
    {
        return cy.xpath('//input[@name="city_selected"]')
    },
    Country:()=>
    {
        return cy.xpath('//select[@id="country"]')
    },
    State:()=>
    {
        return cy.xpath('//select[@id="state"]')
    },
    ZipCode:()=>
    {
        return cy.xpath('//label[text()="Zip Code"]/following-sibling::input')
    },
    btnSave:()=>
    {
        return cy.xpath('//button[text()="Save "]')
    }


}
export default checkout