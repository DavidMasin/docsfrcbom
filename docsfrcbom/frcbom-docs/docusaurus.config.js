// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FRCBOM Docs',
  tagline: 'Onshape-integrated BOM & Manufacturing Flow for FRC teams',
  url: 'https://docs.frcbom.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'frcbom',
  projectName: 'docs',
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',   // 👈 this makes docs mount at /
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      title: 'FRCBOM',
      logo: { alt: 'FRCBOM Logo', src: 'img/logo.png' },
      items: [
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Docs' },
        { href: 'https://frcbom.com', label: 'App', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/intro' },
            { label: 'Setup', to: '/setup/checklist' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Chief Delphi', href: 'https://www.chiefdelphi.com/' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'App', href: 'https://frcbom.com' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FRCBOM`,
    }
    // Note: no explicit "prism" config here; Docusaurus will use its default.
  },
};

module.exports = config;