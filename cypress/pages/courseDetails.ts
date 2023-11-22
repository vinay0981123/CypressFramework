var courseDetails={
    textCourseDetails:()=>
    {
        return cy.get('div.page-title-box>h4')
    },
    clDashboard:()=>
    {
        return cy.xpath('//span[text()="Dashboard  "]')
    },
    

} 
export default courseDetails;