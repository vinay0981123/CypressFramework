import { Given, And, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import home from "../../../../pages/home";
import login from "../../../../pages/login";
import checkout from "../../../../pages/checkout";
import courseDetails from "../../../../pages/courseDetails";
import dashboard from "../../../../pages/dashboard";
import liveMeeting from "../../../../pages/liveMeeting";

//function to generate random string
function generateRandomString(length) {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let result = '';
   const charactersLength = characters.length;
 
   for (let i = 0; i < length; i++) {
     const randomIndex = Math.floor(Math.random() * charactersLength);
     result += characters.charAt(randomIndex);
   }
 
   return result;
 }
//locating iframe
const getIframeDocument = () => {
   return cy
      .get('iframe')
      .its('0.contentDocument').should('exist')
}
//getting iframe content
const getIframeBody = () => {
   return getIframeDocument()
      .its('body').should('not.be.undefined')
      .then(cy.wrap)
}

Given('I visit the application', () => {
   //Handling uncaught exception raised by application
   cy.on("uncaught:exception", (e, runnable) => {
      console.log("error", e);
      console.log("runnable", runnable);
      console.log("error", e.message);
      return false;
   });
   //visiting application
   cy.visit('https://dev.infyni.com/', {

   });

})

When('I click EnrollNow for any Course', () => {

   home.clTrendingCourses(1).click()

})
Then('Verify user should be on login page', () => {

   login.textLoginToYourAccount().should('be.visible')

})
When('I specify valid username and password', () => {
   
   let totalData=3
   let currentCount
   //Reading and Writing data in json files
   cy.readFile('cypress/fixtures/dataCount.json').then((data) => {
      cy.fixture('example.json').then((jsondata) => {
         currentCount=data.count
         login.username().type(jsondata[currentCount].username)
         login.password().type(jsondata[currentCount].password)
         if(currentCount==totalData-1){
            currentCount=0
         }
         else{
            currentCount=currentCount+1
         }
         data.count=currentCount
         cy.writeFile('cypress/fixtures/dataCount.json', data)
      })
   })
})
And('I click on SignIn button', () => {

   login.btnSignIn().click()

})
Then('Verify User should able to see course details page', () => {

   cy.url().then((url) => {
      const currentUrl = url;
      cy.log(`Current URL: ${currentUrl}`);
      // if you not paid for the course
      if (currentUrl.includes('checkout')) {
         cy.xpath('//h6[text()="Billing Address"]/following-sibling::div[1]/div').then(($element)=>
         {
            //checking if billing address added or not if length is 0 means not added
            let len=$element.find('p').length
            if(len==0){
               //adding billing address
               cy.xpath('//a[text()=" Add Address"]').click()
               checkout.firstName().type(generateRandomString(5))
               cy.wait(1000)
               checkout.LastName().type(generateRandomString(4))
               checkout.Address1().type(generateRandomString(6))
               checkout.Address2().type(generateRandomString(5))
               checkout.City().type(generateRandomString(4))
               checkout.Country().select('1')
               checkout.ZipCode().type(`${Math.floor(100000 + Math.random() * 900000)}`)
               //handling prompt to save billing address details
               cy.on('window:prompt', (promptMessage) => {
                  cy.contains('Save').click();
                });
                cy.wait(1000)
               checkout.btnSave().click({force:true})
            }
         })
         //now paying for course
         checkout.btnPay().click()
         cy.fixture('example.json').then((data) => {
            //Filling card details
            checkout.cardNumber().type(data[0].cardnumber)
            checkout.expiryDate().type(data[0].expirydate)
            checkout.cvv().type(data[0].cvv)
            checkout.cardHolderName().type(data[0].cardholdername)
            checkout.btnPayNow().click()
            checkout.OTP().type(data[0].OTP)
         })
         //making final payment
         checkout.btnSubmit().click()

      }
      else{

         //If billing and payment already done
         courseDetails.textCourseDetails().invoke('text').then((textdata) => {
            cy.wrap(textdata).should('eq', "Course Details")
         })
      }
      
   });
})

When('I click dashboard', () => {

   courseDetails.clDashboard().click()

})
Then('Validate the different tabs with their title is visible', () => {

   dashboard.textCourseDetails().should('be.visible')
   dashboard.textCourseDetailsGraph().should('be.visible')
   dashboard.textMessages().should('be.visible')
   dashboard.textTodayLiveSession().should('be.visible')
   dashboard.textMyAssignmentsAndCourseware().should('be.visible')

})
When('I join live session by giving permission to access camera and microphone', () => {
   dashboard.ContainLinkJoinLiveSession().contains('Join Live Session').click()

})
Then('I should be in meeting', () => {

   getIframeBody().find(liveMeeting.btnMicBackground()).invoke('css', 'background').then((data) => {
      getIframeBody().find(liveMeeting.clMicrophone()).should('be.visible')

   })

})

And('I should able to turn the microphone on', () => {
   //finding mic location on frame
   getIframeBody().find(liveMeeting.clMicrophone()).click()
   cy.wait(2000)
   //getting css of button to know if button is on or off
   getIframeBody().find(liveMeeting.btnMicBackground()).invoke('css', 'background-image').then((data) => {
      //if button is not equal to none means button is on
      cy.wrap(data).should('not.eq', 'none')
   })

})
And('I should able to turn the camera on', () => {
   cy.wait(2000)
   getIframeBody().find(liveMeeting.clVideo()).eq(0).click({ force: true })
   cy.wait(2000)
   getIframeBody().find(liveMeeting.btnVideoBackground()).invoke('css', 'background-color').then((data) => {
      // rgba(0, 0, 0, 0.56) none repeat scroll 0% 0% / auto padding-box border-box when video on
      cy.wrap(data).should('contain', 'rgba(0, 0, 0, 0.56)')
   })

})

When('I click Go To Dashboard', () => {
   liveMeeting.btnGoToDashboard().invoke('removeAttr', 'target').click()
})
Then('Validate user should navigate to the Dashboard page', () => {
   dashboard.textDashboard().should('be.visible')
})
And('I logout from the application', () => {
   dashboard.btnProfile().click()
   dashboard.logout().click()
})