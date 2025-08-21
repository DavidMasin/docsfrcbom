// sidebars.js
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    // 👇 This line makes the / (index.md) page show the left sidebar
    'index',

    {
      type: 'category',
      label: 'Setup (Start Here)',
      collapsed: false,
      items: [
        'setup/overview',
        'setup/register-team',
        'setup/verify',
        'setup/roles',
        'setup/sign-in',
        'setup/create-robot',
        'setup/add-systems',
        'setup/add-machines',
        'setup/link-onshape',
      ],
    },
    {
      type: 'category',
      label: 'Using the Site',
      collapsed: false,
      items: [
        'usage/team-dashboard',
        'usage/robot-page',
        'usage/system-dashboard',
        'usage/system-bom',
        'usage/editing-progress',
        'usage/filters-materials',
        'usage/3d-viewer',
        'usage/downloading-cad',
        'usage/workflows',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/glossary',
        'reference/bom-columns',
        'reference/status-logic',
        'reference/file-formats',
      ],
    },
    'faq',
    'troubleshooting',
    'changelog',
  ],
};

export default sidebars;
