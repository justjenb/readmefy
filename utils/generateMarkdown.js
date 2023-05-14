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
  for (const license of data.projLicense) {
    const licenseLink = renderLicenseLink(license);
    const licenseBadge = renderLicenseBadge(license);
    licenseSection += `${licenseBadge}\n\n**This project is licensed under the [${license}](${licenseLink}) license.**\n\nFor more information about this license, please visit the following link:\n\n${licenseLink}\n\n`;
  }
  return licenseSection;
}

function generateMarkdown(data) {
  const selectedLicenses = renderLicenseSection(data);
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

${selectedLicenses}

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
