var dashboard={
    textTodayLiveSession:()=>
    {
        return cy.xpath('//h4[text()="Today Live Session "]')
    },
    textCourseDetails:()=>
    {
        return cy.get('.col-md-9 > .card-box > .header-title')
    },
    textCourseDetailsGraph:()=>
    {
        return cy.get(':nth-child(3) > :nth-child(1) > .card-box > .header-title')
    },
    textMyAssignmentsAndCourseware:()=>
    {
        return cy.xpath('//h4[text()="My Assignments & Courseware"]')
    },
    textMessages:()=>
    {
        return cy.xpath('//h4[text()="Messages"]')
    },
    ContainLinkJoinLiveSession:()=>
    {
        return cy.xpath('//h4[text()="Today Live Session "]/parent::div')
    },
    textDashboard:()=>
    {
        return cy.xpath('//h4[text()="Dashboard "]')
    },
    btnProfile:()=>
    {
        return cy.xpath('//nav/ul[1]/li[7]/a')
    },
    logout:()=>
    {
        return cy.xpath('//span[text()="Logout"]')
    }


    

}
export default dashboard;