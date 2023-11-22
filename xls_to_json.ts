const xlsx = require("xlsx");
const fs = require("fs");
// reading excel file and also specifing dateformat of the application
const wb = xlsx.readFile("cypress/fixtures/CreateProgram.xlsx",{dateNF:"yyyy-mm-dd"});

const  ws1 = wb.Sheets["KPI"];
const data1 = xlsx.utils.sheet_to_json(ws1,{raw:false})
console.log(data1)

// Code to be written for  file already exist not to recreate or can be executed only if files are old  deleting first the old files
fs.writeFileSync("cypress/fixtures/CreateProgram.json",JSON.stringify(data1, null, 2));

