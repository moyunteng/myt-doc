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
  tutorial: [
    
      
    'kehuduan/如何设置魔云腾安卓平板模式' ,  


    
  ],
  MYTOS开发教程:[
    'MYTOS/魔云腾超级SDK',
    'MYTOS/超级SDK导出导入安卓教程',
    'MYTOS/MYTOS 镜像版本列表',
    'MYTOS/通用常规问题介绍',    
    {
      type: 'category',
      label: '开发',
      items: [
        'MYTOS/SSH连接',
        'MYTOS/格式化固态硬盘',
        'MYTOS/设备助手使用注意规范',
        'MYTOS/手动配置网络参数',
        'MYTOS/数据安全备份及迁移',
        'MYTOS/清理未使用的安卓镜像',
        'MYTOS/按需制定文件系统',
          {
            type: 'category',
            label: '应用案例',
            items: [
              'MYTOS/运行rkllm大模型',
              'MYTOS/运行rknn demo',
              'MYTOS/运行rkmpp demo',
              'MYTOS/安装librga库',
              'MYTOS/运行jellyfin',
              'MYTOS/运行redroid',

            ],
          },
      ],
    },
  ],
  zeus: [
      {
        type: 'category',
        label: 'C1主机的介绍与使用',
        items: [
          'zeus-c1/C1 ubuntu固件',
          
        ],
      },  
    
      
      {
        type: 'category',
        label: 'Q1主机的介绍与使用',
        items: [
          'zeus-q/Q1主机介绍',
          'zeus-q/Zeus Q1 主机固件',
          'zeus-q/ubuntu使用',
          'zeus-q/安装指南',
        ],
      },
      {
        type: 'category',
        label: 'A1主机的介绍与使用',
        items: [
          'A1/Zeus A1 主机固件',
          
        ],
      },
      
      
      'zeus-q/维护与保养',
      'zeus-q/常见问题',
      'zeus-q/安全信息',
      'zeus-q/保修服务政策',
  ],
  kehuduan:[

    {
      type: 'category',
      label: 'PC客户端使用说明',
      items: [
        'kehuduan/PC客户端',
        'kehuduan/带屏幕机型操作',
        'kehuduan/安全模式',
        'kehuduan/正确设置安卓DNS',
              
      ],
    },
    {
      type: 'category',
      label: 'WEB客户端使用说明',
      items: [
        'kehuduan/Myt Zues C1-VPC网络管理',
        'kehuduan/Myt Zues C8-VPC网络管理', 
    
      ],
    },
    {
      type: 'category',
      label: 'IOS客户端使用说明',
      items: [
        'kehuduan/魔云趣联 （IPA文件）', 
    
      ],
    },

  ],
  zeuss:[
    {
      type: 'category',
      label: 'C8主机的介绍与使用',
      items: [
        'zeus-c8/Zeus C8 主机固件', 
        'zeus-c8/Zeus C8 Windows刷机文件系统教程', 
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
