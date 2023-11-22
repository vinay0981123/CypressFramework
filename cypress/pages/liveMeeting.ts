/// <reference types="cypress-xpath" />
var liveMeeting={
    clMicrophone:()=>
    {
        return 'div:nth-child(2) > div > button'
    },
    clRequestPermission:()=>
    {
        return cy.get('button.jstest-avpermissions-requestingPermission-button')
    },
    btnMicBackground:()=>
    {
        return 'div:nth-child(2) > div > button > div > div'
    },
    btnVideoBackground:()=>
    {
        return 'div:nth-child(1) > div > button > div > div'
    },
    clVideo:()=>
    {
        return 'div:nth-child(2) > div>div>div>div>div > button'
    },
    btnGoToDashboard:()=>
    {
        return cy.xpath('//button[text()="Go To Dashboard"]/parent::a')
    }
    
} 
export default liveMeeting;