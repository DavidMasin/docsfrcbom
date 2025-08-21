import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FRCBOM — User Guide',
  tagline: 'Everything you need to use frcbom.com like a pro',
  favicon: 'img/favicon.ico',
  url: 'https://docs.frcbom.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',            // docs at site root
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: undefined,
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      navbar: {
        title: 'FRCBOM Docs',
        logo: { alt: 'FRCBOM', src: 'img/logo.png' },
        items: [
          { to: '/', label: 'Docs', position: 'left' },
          { href: 'https://frcbom.com', label: 'frcbom.com', position: 'right' },
          { href: 'https://github.com/', label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Setup', to: '/setup/overview' },
              { label: 'Usage', to: '/usage/team-dashboard' },
              { label: 'Reference', to: '/reference/glossary' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} FRCBOM.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
