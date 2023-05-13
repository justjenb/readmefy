function renderLicenseBadge(license) {

}

// TODO: Create a function that returns the license link
function renderLicenseLink(license) {

}


// [![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)


// TODO: Create a function that returns the license section of README
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

${renderLicenseSection(data.projLicense)}

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
