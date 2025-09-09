# 微前端项目说明

基于 `qiankun` 的微前端架构，主应用为 React（`main-app`），子应用支持 React 和 Vue。

## 项目结构

- **主应用（React）**：位于 `main-app` 目录，负责整体布局和子应用加载
- **React 子应用**：位于 `react-app` 目录，使用 React 18 + Ant Design 开发
- **Vue 子应用**：位于 `vue-app` 目录，使用 Vue 3 + Element Plus 开发

## 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

## 快速开始

### 1. 安装依赖

```bash
# 安装主应用依赖
cd main-app && npm install

# 安装 React 子应用依赖  
cd ../react-app && npm install

# 安装 Vue 子应用依赖
cd ../vue-app && npm install
```

### 2. 开发环境配置

#### 主应用配置 (main-app/src/index.js)

主应用已集成 `qiankun`，配置了子应用的注册和启动：

```javascript
registerMicroApps([
  {
    name: 'app-vue',
    entry: process.env.NODE_ENV === 'development' ? '//localhost:8080/' : '/child/vue-history/',
    container: '#container',
    activeRule: '/app-vue-history'
  },
  {
    name: 'react-app',
    entry: process.env.NODE_ENV === 'development' ? '//localhost:3002' : '/child/react-history/',
    container: '#container',
    activeRule: '/react',
    props: state
  },
]);

start({
  sandbox: false
});
```

#### React 子应用配置 (react-app/.rescriptsrc.js)

配置了 Webpack 输出格式和开发服务器跨域设置：

```javascript
module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.chunkLoadingGlobal = `chunkLoadingGlobal_${name}`;
    config.output.globalObject = 'window';
    return config;
  },
  devServer: (_) => {
    const config = _;
    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.static.watch = false;
    config.liveReload = false;
    return config;
  },
};
```

#### Vue 子应用配置 (vue-app/vue.config.js)

配置了公共路径和开发服务器设置：

```javascript
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/child/vue-history/',
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `chunkLoadingGlobal_${name}`,
    },
  },
});
```

### 3. 启动项目

#### 开发环境启动

需要同时启动三个应用（建议使用三个终端窗口）：

```bash
# 终端1：启动主应用 (端口: 3000)
cd main-app && npm start

# 终端2：启动 React 子应用 (端口: 3002)  
cd react-app && npm start

# 终端3：启动 Vue 子应用 (端口: 8080)
cd vue-app && npm run serve
```

#### 访问地址

- 主应用：http://localhost:3000
- React 子应用：http://localhost:3000/react
- Vue 子应用：http://localhost:3000/app-vue-history

### 4. 生产环境构建

```bash
# 构建主应用
cd main-app && npm run build

# 构建 React 子应用
cd ../react-app && npm run build

# 构建 Vue 子应用  
cd ../vue-app && npm run build
```

## 部署配置

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 主应用
    location / {
        root /path/to/main-app/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # React 子应用
    location /child/react-history/ {
        alias /path/to/react-app/build/;
        index index.html;
        try_files $uri $uri/ /child/react-history/index.html;
    }
    
    # Vue 子应用
    location /child/vue-history/ {
        alias /path/to/vue-app/dist/;
        index index.html;
        try_files $uri $uri/ /child/vue-history/index.html;
    }
}
```



## 注意事项

1. **跨域问题**：子应用已配置开发服务器跨域头 `Access-Control-Allow-Origin: *`
2. **路由配置**：主应用使用 BrowserRouter，子应用路由前缀需避免冲突
3. **静态资源路径**：子应用根据环境动态设置 `publicPath`
4. **全局状态管理**：可通过 `qiankun` 的 `initGlobalState` 实现应用间通信
5. **样式隔离**：当前配置 `sandbox: false`，如需样式隔离可启用严格样式隔离

## 技术栈

- **主应用**: React 19 + Ant Design + React Router + Qiankun
- **React 子应用**: React 19 + Ant Design + Rescripts
- **Vue 子应用**: Vue 3 + Element Plus + Pinia + Vue Router

## 参考文档

- [qiankun 官方文档](https://qiankun.umijs.org/)
- [React 官方文档](https://react.dev/)
- [Vue 官方文档](https://vuejs.org/)