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
    'MYTOS/导入抓包证书教程',
    'android/[网络相关] 使用frp穿透工具实现魔云腾公网访问使用',
    
    
  ],
  MYTOS开发教程:[
    {
      type: 'category',
      label: 'API接口',
      items: [
        'MYTOS/安卓管理控制接口对接介绍',
        'android/mytApi',
        'MYTOS/魔云腾超级SDK',
        'MYTOS/超级SDK导出导入安卓教程',
        'MYTOS/自动化MYT_RPA_SDK',
        'MYTOS/超级SDK设置多核多线程',
        'MYTOS/MYTOS 镜像版本列表',
        'MYTOS/屏幕自动化辅助控制系统接口',
        'MYTOS/设备信息接口调用说明',
        'MYTOS/基于docker-api封装的成品API',
        'MYTOS/易语言对接自动化控制模块Demo',
      ],
    }, 
      'MYTOS/通用常规问题介绍', 
    {
      type: 'category',
      label: '使用教程',
      items: [
        'MYTOS/SSH连接',
        'MYTOS/格式化固态硬盘',
        'MYTOS/设备助手使用注意规范',
        'MYTOS/手动配置网络参数',
        'MYTOS/数据安全备份及迁移',
        'MYTOS/清理未使用的安卓镜像',
        'MYTOS/按需制定文件系统',
        'MYTOS/服务商限制访问的解决方案',
          
      ],
    },
    {
      type: 'category',
      label: '知识科普',
      items: [
        'MYTOS/MYTOS中内置SOCKS5代理',
        'MYTOS/通过docker官方API调用查询控制MYTOS',
        'MYTOS/3588更换ssd后格式化方法',
        'MYTOS/M.2-NVME-带缓存的优劣',
        'MYTOS/安卓系统镜像标识含义介绍',
        'MYTOS/底层固件使用Alpine Linux系统开发介绍',
        'MYTOS/关于docker方面的知识解答',
      ],
    },  
    
  ],
  zeus: [
      {
        type: 'category',
        label: 'C1主机的介绍与使用',
        items: [
          'zeus-c1/C1ubuntu固件',
          'zeus-c1/Zeus C1 WEB插件给安卓指定VPC教程',
        ],
      },  
    
      
      {
        type: 'category',
        label: 'Q1主机的介绍与使用',
        items: [
          'zeus-q/Q1主机介绍',
          'zeus-q/Zeus Q1 主机固件',
          'zeus-q/Q1 ubuntu固件',
          'zeus-q/Q1ubuntu刷机教程',
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
      {
        type: 'category',
        label: 'P1主机的介绍与使用',
        items: [
          'p1/p1刷机教程',
          
        ],
      },
      'zeus-q/修改静态ip',
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
    {
      type: 'category',
      label: 'M48主机的介绍与使用',
      items: [
        'M48/M48接口介绍', 
        'M48/M48服务器装箱清单及规格说明', 
        'M48/M48快速安装使用说明', 
        'M48/ARM集群服务器-魔云腾M48视频',
        'M48/M48固件',
        'M48/M48刷机教程',
      ],
    },
  ],
  linux:[
    'linux/ubuntu使用',
    {
      type: 'category',
      label: '应用案例',
      items: [
        'linux/运行rkllm大模型',
        'linux/运行rknn demo',
        'linux/运行rkmpp demo',
        'linux/安装librga库',
        'linux/运行jellyfin',
        'linux/运行redroid',
        'linux/构建deepseek',

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
