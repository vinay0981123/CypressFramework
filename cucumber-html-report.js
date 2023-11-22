var today = new Date();

var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();


const report = require("multiple-cucumber-html-reporter");
report.generate({
  jsonDir: "jsonlogs", // ** Path of .json file **//
  reportPath: "./reports/cucumber-htmlreport.html",
  reportName:"CT-CAH Report",
  displayReportTime: "true",

displayDuration: "Yes",

durationInS: "true",

  metadata: {
    browser: {
      name: "chrome",
      version: "XX",
      
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
      version: "11",
    },
  },


  customData: {

    title: 'Run info',

    data: [

        {label: 'Project', value: 'CT_CAH project'},

        {label: 'Release', value: '1.1.1'},

        {label: 'Cycle', value: 'POC'},

        {label: 'Execution Date', value: date}

    ]

}



});
