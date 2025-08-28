/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'intro',
        'setup/accounts-and-roles',
        'setup/onshape-classroom-properties',
        'setup/bom-template',
        'setup/fs-and-settings'
      ],
    },
    {
      type: 'category',
      label: 'Using FRCBOM',
      items: [
        'using/create-robot-and-systems',
        'using/subassemblies',
        'using/download-cad',
        'using/real-time-collab'
      ],
    }],
};

module.exports = sidebars;