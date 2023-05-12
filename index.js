// TODO: Include packages needed for this application
const markdown = require('./utils/generateMarkdown');
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the name of your project repo?'
    },    
    {
        type: 'editor',
        name: 'projDescription',
        message: 'Provide a short description explaining the what, why, and how of your project.'
    },
];

inquirer
  .prompt(questions)
  .then((data) => {
    
    fs.writeFile("README.md", JSON.stringify(data), (err) =>
      err ? console.error(err) : console.log("Success!")
    );
  });

// TODO: Create a function to write README file
// function writeToFile(data) {

// }

// // TODO: Create a function to initialize app
// function init() {
//     writeToFile(data)
// }

// // Function call to initialize app
// init();
