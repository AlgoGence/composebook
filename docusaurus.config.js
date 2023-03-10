// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
plugins: [],
    scripts: [
        "/scripts/myjs.js"
    ],
  title: 'ComposeBook',
  tagline: 'Comprehensive Guide for Jetpack Compose',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://comosebook.algogence.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'algogence', // Usually your GitHub org/user name.
  projectName: 'composeBook', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
        localeConfigs: {
          en: {
            label: 'English',
            direction: 'ltr',
            htmlLang: 'en-US',
            calendar: 'gregory',
            path: 'en',
          },
        },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
      sitemap: {
                changefreq: 'daily',
                priority: 0.5,
                ignorePatterns: ['/tags/**'],
                filename: 'sitemap.xml',
              },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/'
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        metadata: [
            {
                name: 'keywords',
                content: 'android, jetpack compose, compose, getting started with jetpack compose, jetpack compose version upgrade, modern ui with jetpack compose'
            }
        ],
      // Replace with your project's social card
      image: 'img/compose-book-social-card.png',
      navbar: {
        title: 'ComposeBook',
        logo: {
          alt: 'ComposeBook',
          src: 'img/compose_book_logo.svg',
        },
        items: [
          /*{
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Introduction',
          },*/
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/AlgoGence/composebook',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          /*{
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },*/
          /*{
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/AlgoGence/composebook',
              },
            ],
          },*/
        ],
        copyright: `Copyright ?? ${new Date().getFullYear()} AlgoGence. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/dracula'),//lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['kotlin']
      },
    }),
};

module.exports = config;
