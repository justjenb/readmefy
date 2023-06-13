// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

const { generateMarkdown } = require("./utils/generateMarkdown");

const fs = require("fs");
const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "projectTitle",
    message: "What is the name of your project repo?",
  },
  {
    type: "editor",
    name: "projDescription",
    message:
      "Provide a short description explaining the what, why, and how of your project.",
  },
  {
    type: "editor",
    name: "installInfo",
    message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
  },
  {
    type: "editor",
    name: "projUsage",
    message:
      "Provide instructions and examples for use.",
  },
  {
    type: "checkbox",
    name: "projLicense",
    message:
      "What licenses are you using for your project? Please select an option.",
    choices: [],
  },
  {
    type: "editor",
    name: "projCredits",
    message:
      "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well.",
  },
  {
    type: "editor",
    name: "projTests",
    message:
      "Go the extra mile and write tests for your application. Then provide examples on how to run them here.",
  },
  {
    type: "input",
    name: "userName",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "ghUserName",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "projQuestions",
    message:
      "Enter some information on how to contact you if there are any questions regarding your project.",
  },
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

async function askForImages() {
  const images = [];
  let addingImages = true;
  const imageFileRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

  while (addingImages) {
    const image = await inquirer.prompt([
      {
        type: "input",
        name: "description",
        message: "Enter a description for the image:",
      },
      {
        type: "input",
        name: "fileName",
        message: "Enter the file path of the image (must end with .jpg, .jpeg, .png, .gif, or .bmp):",
        validate: (fileName) => {
          if (imageFileRegex.test(fileName)) {
            return true;
          }
          return "Please enter a valid image file name.";
        },
      },
    ]);

    images.push(image);

    const addAnother = await inquirer.prompt([
      {
        type: "confirm",
        name: "image",
        message: "Do you want to add another image?",
      },
    ]);

    addingImages = addAnother.image;
  }

  return images;
}



function writeToFile(questions) {
  markdown = generateMarkdown(questions);
  fs.writeFile("README1.md", markdown, (err) =>
    err ? console.error(err) : console.log("Success!")
  );
}

async function init() {
  let licensing = await getLicenses();
  let answers = await inquirer.prompt(questions);

  const addImages = await inquirer.prompt({
    type: "confirm",
    name: "addImages",
    message: "Do you want to add any images?",
  });

  if (addImages.addImages) {
    answers.images = await askForImages();
  } else {
    answers.images = []; 
  }

  const selectedLicenses = answers.projLicense;
  let licenseInfo = (answers.licenseInfo = []);
  for (const selectedLicense of selectedLicenses) {
    for (const license of licensing) {
      if (license.spdx_id == selectedLicense) {
        licenseInfo.push(license);
        break;
      }
    }
  }
  writeToFile(answers);
}

init();
