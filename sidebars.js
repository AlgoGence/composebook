/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure


  // But you can create a sidebar manually

  tutorialSidebar: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/create-a-project',
        'getting-started/cleanup',
        'getting-started/basic-code',
        'getting-started/text-basic-details-for-intro',
        'getting-started/how-compose-works',
        'getting-started/basic-ui',
        'getting-started/upgradation',
      ],
    },
  ],

};

module.exports = sidebars;
