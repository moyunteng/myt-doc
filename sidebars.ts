import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
   'client',
  ],
  tutorial: [
    {
      type: 'autogenerated',
      dirName: 'tutorial'
    },
  ],
  zenus_q: [
    
      {
        type: 'category',
        label: '魔云腾主机的介绍与使用',
        items: [
          'zenus-q/魔云腾主机介绍',
          'zenus-q/ubuntu使用',
        ],
      },
    
      {
        type: 'category',
        label: '开发',
        items: [
          'zenus-q/按需制定文件系统',
            {
              type: 'category',
              label: '应用案例',
              items: [
                'zenus-q/运行rkllm大模型',
                'zenus-q/运行rknn demo',
                'zenus-q/运行rkmpp demo',
                'zenus-q/安装librga库',
                'zenus-q/运行jellyfin',

              ],
            },
        ],
      },
  ],
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
