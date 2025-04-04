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
              label: 'API接口',
              to:'/docs/MYTOS/guanliapijiekou',
            },
            {
              label: '使用教程',
              to:'/docs/MYTOS/sshlianjie',
            },
            {
              label: '知识科普',
              to:'/docs/MYTOS/SOCKS5daili',
            },
          ]              
        },
        {
          type: 'dropdown',
          label: 'linux开发教程',
          position: 'left',
          sidebarId: 'linux开发教程',
          items:[
            {
              label: 'ubuntu使用',
              to:'/docs/linux/ubuntushiyong',
            },
            {
              label: '应用实例',
              to:'/docs/linux/yunxingrkllm',
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
              to:'/docs/kehuduan/PCkehuduan',
            },
            {
              label: 'WEB端',
              to:'/docs/kehuduan/C1-VPC',
            },
            {
              label: 'IOS端',
              to:'/docs/kehuduan/moyunqulianipa',
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
              to:'/docs/zeus-c1/C1 ubuntu',
            },            
            {
              label: 'Q1系列',
              to:'/docs/zeus-q/Q1zhujijieshao',
            },
            {
              label: 'A1系列',
              to:'/docs/A1/A1zhujigujian',
            },
            {
              label: 'p1系列',
              to:'/docs/p1/sjjc',
            },
            {
              label: '通用设置',
              to:'/docs/zeus-q/jingtaiip',
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
              to:'/docs/zeus-c8/Zeus C8 gujian',
            },
            {
              label: 'M48系列',
              to:'/docs/M48/M48jiekou',
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
  
  themes: [
    // 添加本地搜索主题 ▼
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,          // 对搜索词加密
        language: ['en', 'zh'],// 支持的语言
        docsRouteBasePath: '/',// 文档路径
        indexDocs: true, // 索引文档
        indexBlog: true, // 索引博客
        indexPages: false, // 不索引静态页
        forceIgnoreNoIndex: true
      }
    ]
  ],
};

export default config;
