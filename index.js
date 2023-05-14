// TODO: Include packages needed for this application
const { generateMarkdown } = require("./utils/generateMarkdown");

const fs = require("fs");
const inquirer = require("inquirer");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "projectTitle",
    message: "What is the name of your project repo?",
  },
  // {
  //   type: "editor",
  //   name: "projDescription",
  //   message: "Provide a short description explaining the what, why, and how of your project.",
  // },
  // {
  //   type: "editor",
  //   name: "projContentsTb",
  //   message: "Provide a table of contents for your project.",
  // },
  // {
  //   type: "editor",
  //   name: "installInfo",
  //   message: "Provide information about how to install your project.",
  // },
  // {
  //   type: "editor",
  //   name: "projUsage",
  //   message: "Provide instructions and examples for use. Include screenshots as needed.",
  // },
  {
    type: "checkbox",
    name: "projLicense",
    message:
      "What licenses are you using for your project? Please select an option.",
    choices: [],
  },
  // {
  //   type: "editor",
  //   name: "projCredits",
  //   message: "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well.",
  // },
  // {
  //   type: "editor",
  //   name: "projTests",
  //   message: "Go the extra mile and write tests for your application. Then provide examples on how to run them here.",
  // },
  // {
  //   type: "editor",
  //   name: "projQuestions",
  //   message: "Enter some information on how to contact you if there are any questions regarding your project.",
  // }
];

async function getLicenses() {
  try {
    const response = await fetch("https://api.github.com/licenses");
    const licenses = await response.json();
    const licenseOptions = [];

    for (const license of licenses) {
      const option = {
        name: license.name,
        value: license.spdx_id,
      };
      licenseOptions.push(option);
    }
    questions.find((q) => q.name === "projLicense").choices = licenseOptions;
    return licenses;
  } catch (error) {
    console.error("Error fetching licenses:", error);
  }
}

// TODO: Create a function to write README file
function writeToFile(questions) {
  markdown = generateMarkdown(questions);
  fs.writeFile("README.md", markdown, (err) =>
    err ? console.error(err) : console.log("Success!")
  );
}

// TODO: Create a function to initialize app
async function init() {
  licensing = await getLicenses();
  const answers = await inquirer.prompt(questions);
  const selectedLicenses = answers.projLicense;  
  let licenseInfo = answers.licenseInfo = [];
  for (const selectedLicense of selectedLicenses) {
    for (const license of licensing) {
      if (license.spdx_id == selectedLicense) {
        licenseInfo.push(license);
        break;
      }
    }
  }
  console.log(licenseInfo);
  writeToFile(answers);
}

// Function call to initialize app
init();
