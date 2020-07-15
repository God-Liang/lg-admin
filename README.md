# 项目说明

## 目录

- [运行步骤](#运行步骤)
- [项目介绍](#项目介绍)
- [功能介绍](#功能介绍)

- [目录结构](#目录结构)

<a name="运行步骤"></a>

### 运行步骤

1. 拉取代码 `git clone 'http://gitlab.enjoybuy.vip/frontend/agent_admin.git'`
2. 安装依赖 `npm install`
3. 运行项目 `npm run serve`
4. 打包项目

- 测试版本：`npm run build:test`
- 正式版本：`npm run build:prod`

<a name="项目介绍"></a>

### 项目介绍

> 代理商后台管理系统

<a name="功能介绍"></a>

### 功能介绍

###### .env 环境变量配置

- NODE_ENV 环境变量
  - 本地环境： development
  - 生成环境： production
- VUE_APP_MODE 项目类型
  - 根据 vue.project.js 文件配置
- VUE_APP_PERMISSION_ASYNC 路由权限类型
  - 权限对比： 1
  - 路由属性： 2
- VUE_APP_PREVIEW
- VUE_APP_API_BASE_URL api 接口地址

<a name="目录结构"></a>

### 目录结构

```
├── plop-templates             # 基本模板
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体 图标等静态资源
│   ├── components             # 全局公用组件
│   ├── config                 # 默认路由、配置
│   ├── core                   # 项目引导, 全局配置初始化，依赖包引入等
│   ├── layouts                # 基础布局
│   ├── locales                # 国际化
│   ├── mock                   # 项目mock 模拟数据
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── utils                  # 工具库
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
│   └── global.less            # 全局样式
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .travis.yml                # 自动化CI配置
├── commitlint.config.js       # git规范 配置
├── plopfile.js                # plop
├── vue.config.js              # vue-cli 配置
├── vue.project.js             # 多项目 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```
