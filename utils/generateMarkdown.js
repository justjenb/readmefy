function renderLicenseBadge(license) {
  const licensePart = license.replace(/-/g, "_");
  return `![License](https://img.shields.io/badge/License-${licensePart}-blue.svg)`;
}

// TODO: Create a function that returns the license link
function renderLicenseLink(license) {
  return `https://opensource.org/licenses/${license}`;
}

// TODO: Create a function that returns the license section of README
function renderLicenseSection(data) {
  let licenseSection = "";
  let licenseBadges = "";
  for (const license of data.projLicense) {
    const licenseLink = renderLicenseLink(license);
    const licenseBadge = renderLicenseBadge(license);
    licenseSection += `**This project is licensed under the [${license}](${licenseLink}) license.**\n\nFor more information about this license, please visit the following link:\n\n${licenseLink}\n\n`;
    licenseBadges += `${licenseBadge}\n\n`
  }
  return {licenseSection, licenseBadges};
}

function generateMarkdown(data) {
  const { licenseSection, licenseBadges } = renderLicenseSection(data);
  const markdown = `
# ${data.projectTitle}

${licenseBadges}

## Description

${data.projDescription}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Tests](#tests)
- [Contact](#contact)

## Installation

${data.installInfo}

## Usage

${data.projUsage}

## License

${licenseSection}

## Credits

${data.projCredits}

## Tests

${data.projTests}

## Contact

My name is ${data.userName};

${data.projQuestions}
`;
  return markdown;
}

module.exports = { generateMarkdown };
