function renderLicenseBadge(license) {
  const licensePart = license.replace(/-/g, "_");
  return `![License](https://img.shields.io/badge/License-${licensePart}-blue.svg)`;
}

function renderLicenseLink(license) {
  return `https://opensource.org/licenses/${license}`;
}

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
  let imagesMarkdown = "";
  if (data.images) {
    for (const image of data.images) {
      imagesMarkdown += `![${image.description}](./${image.fileName})\n`;
    }
  }
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

${imagesMarkdown}

## License

${licenseSection}

## Credits

${data.projCredits}

## Tests

${data.projTests}

## Contact

My name is ${data.userName}.

Here is a link to my [GitHub](https://github.com/${data.ghUserName}) profile. 

Additional contact details:

${data.projQuestions}
`;
  return markdown;
}

module.exports = { generateMarkdown };
