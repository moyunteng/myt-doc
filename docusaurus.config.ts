import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '魔云腾',
  tagline: '文档中心',
  favicon: 'img/72.png',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL || '/myt-doc/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'MYT',
      logo: {
        alt: 'My Site Logo',
        src: 'img/72.png',
      },
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'client',
          label: '文档',
        },
        /*{
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'zeus_q',
          label: 'ZEUS Q系列',
        },*/
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'tutorial',
          label: '安卓教程',
        },

        {
          type: 'dropdown',
          label: 'MYTOS开发教程',
          position: 'left',
          sidebarId: 'MYTOS开发教程',
          items:[
            {
              label: 'MYTOS开发教程',
              to:'/docs/MYTOS/魔云腾超级SDK',
            }
          ]              
        },

        {
          type: 'dropdown',
          label: '客户端',
          position: 'left',
          sidebarId: 'kehuduan',
          items:[
            {
              label: 'PC端',
              to:'/docs/kehuduan/PC客户端',
            },
            {
              label: 'WEB端',
              to:'/docs/kehuduan/Myt Zues C1-VPC网络管理',
            },
            {
              label: 'IOS端',
              to:'/docs/kehuduan/魔云趣联 （IPA文件）',
            },
          ]              
        },

        {
          type: 'dropdown',
          label: '单路系列',
          position: 'left',
          sidebarId: 'zeus',
          items:[
            {
              label: 'C1系列',
              to:'/docs/zeus-c1/C1 ubuntu固件',
            },            
            {
              label: 'Q1系列',
              to:'/docs/zeus-q/Q1主机介绍',
            },
            {
              label: 'A1系列',
              to:'/docs/A1/Zeus A1 主机固件',
            },
          ]              
        },
        {
          type: 'dropdown',
          label: '多路系列',
          position: 'left',
          sidebarId: 'zeuss',
          items:[
            {
              label: 'C8系列',
              to:'/docs/zeus-c8/Zeus C8 主机固件',
            },
          ]              
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        /*
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
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
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
        */
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 武汉魔云腾科技有限公司 <a href="https://beian.miit.gov.cn/">鄂ICP备2023003158号-1</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
