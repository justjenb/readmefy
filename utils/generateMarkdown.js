// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {


}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {


}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {


}

function generateMarkdown(data) {
  const markdown = `
# ${data.projectTitle}

## Description

${data.projDescription}

## Table of Contents

${data.projContentsTb}

## Installation

${data.installInfo}

## Usage

${data.projUsage}

## License

${data.projLicense}

## Credits

${data.projCredits}

## Tests

${data.projTests}

## Contact

${data.projQuestions}
`;
  return markdown;
}

module.exports = { generateMarkdown };
