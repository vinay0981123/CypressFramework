const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

const { isFileExist } = require('cy-verify-downloads');
const { verifyDownloadTasks } = require('cy-verify-downloads');

// import { defineConfig } from "cypress";
const { defineConfig } = require("cypress");

// The rest of your Cypress configuration


// import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
// import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
// import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;

// The rest of your code

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
  
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
  
}

module.exports = defineConfig({
  e2e: {
    // specPattern:"cypress/e2e/features/Web_Interface/**/*.feature",
    // baseUrl: "https://dev.infyni.com/",
    supportFile: false,
    chromeWebSecurity:false,

        //Cucumber preprocessor set-up
        async setupNodeEvents(on, config) {
          on('task',
             {
                // generateJSONFromExcel: generateJSONFromExcel,
 
             })
 
          const bundler = createBundler({
             plugins: [createEsbuildPlugin(config)],
          });
 
          on("file:preprocessor", bundler);
          await addCucumberPreprocessorPlugin(on, config);
          // allureWriter(on, config);
          return config;
 
       },
       specPattern:["cypress/e2e/Features/Web_Interface/**/*.feature","cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"],
  watchForFileChanges:false,
  viewportHeight:720,
  viewportWidth:1280,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 40000,
  experimentalWebKitSupport: true,
  video:false

},  
});
/////
  

// Excel To JSON
// function generateJSONFromExcel(agrs: any) {
//   const wb = XLSX.readFile(agrs.excelFilePath, { dateNF: "mm/dd/yyyy" });
//   const ws = wb.Sheets[agrs.sheetName];
//   return XLSX.utils.sheet_to_json(ws, { raw: false });

// }


