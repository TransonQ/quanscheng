// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TransonQ',
  tagline: '收藏从未停止, 学习从未开始',
  url: 'https://quanscheng.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'quanscheng', // Usually your GitHub org/user name.
  projectName: 'quanscheng', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Transon的博客',
          blogDescription: '正在努力建设中...',
          // postsPerPage: 'ALL',
          blogSidebarTitle: '全部博文',
          blogSidebarCount: 'ALL',
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
      // announcementBar: {
      //   id: 'support_us',
      //   content:
      //     '觉得有帮助的话, 赏一个⭐️吧 👉🏻 <a target="_blank" rel="noopener noreferrer" href="https://github.com/quanscheng/quanscheng">GitHub</a>',
      //   backgroundColor: '#1c1e21',
      //   textColor: '#0088CCff',
      //   isCloseable: true,
      // },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'TransonQ',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        hideOnScroll: true,
        items: [
          // { to: '/nav', label: '导航', position: 'left' },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '文档',
          },
          { to: '/blog', label: '博客', position: 'left' },

          {
            href: 'https://github.com/TransonQ',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'FULE7ZKRWQ',

        // Public API key: it is safe to commit it
        apiKey: '6206ca5a3da00fad9c7e4bf05f83ee61',

        // algolia application name
        indexName: 'quanscheng',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

      },
    }),
}

module.exports = config
