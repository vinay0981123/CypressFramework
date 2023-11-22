Feature: Testing the Full Flow - Enroll in a Course, Join Live Session, interact and back to dashboard

  Scenario: Enroll in a Course, Join Live Session, and back to dashboard
    Given I visit the application
    When I click EnrollNow for any Course
    Then Verify user should be on login page
    When I specify valid username and password
    And I click on SignIn button
    Then Verify User should able to see course details page
    When I click dashboard
    Then Validate the different tabs with their title is visible
