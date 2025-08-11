# 微前端项目说明

基于 `qiankun` 的微前端架构，主应用为 React（`main-app`），子应用支持 React 和 Vue。

## 项目结构

- **主应用（React）**：位于 `main-app` 目录，负责整体布局和子应用加载。
- **子应用（React/Vue）**：独立开发、部署的微应用。

## 快速开始

### 1. 主应用配置

1. 主应用已集成 `qiankun`，无需额外安装依赖。
2. 在主应用中注册子应用（示例配置）：
   ```javascript
   import { registerMicroApps, start } from 'qiankun';

   registerMicroApps([
     {
       name: 'react-app',
       entry: '//localhost:7101',
       container: '#subapp-container',
       activeRule: '/react',
     },
     {
       name: 'vue-app',
       entry: '//localhost:7102',
       container: '#subapp-container',
       activeRule: '/vue',
     },
   ]);

   start();
   ```

### 2. 子应用配置

#### React 子应用
1. 在 `src` 目录下新增 `public-path.js`：
   ```javascript
   if (window.__POWERED_BY_QIANKUN__) {
     __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
   }
   ```
2. 修改入口文件（如 `index.js`）：
   ```javascript
   import './public-path';
   import { render } from 'react-dom';

   function renderApp(props) {
     const { container } = props;
     render(<App />, container?.querySelector('#root') || document.getElementById('root'));
   }

   if (!window.__POWERED_BY_QIANKUN__) {
     renderApp({});
   }

   export async function bootstrap() {}
   export async function mount(props) {
     renderApp(props);
   }
   export async function unmount(props) {
     const { container } = props;
     ReactDOM.unmountComponentAtNode(container?.querySelector('#root') || document.getElementById('root'));
   }
   ```

#### Vue 子应用
1. 修改入口文件（如 `main.js`）：
   ```javascript
   import './public-path';
   import Vue from 'vue';
   import App from './App.vue';

   let instance = null;

   function render(props = {}) {
     const { container } = props;
     instance = new Vue({
       render: h => h(App),
     }).$mount(container?.querySelector('#app') || '#app');
   }

   if (!window.__POWERED_BY_QIANKUN__) {
     render();
   }

   export async function bootstrap() {}
   export async function mount(props) {
     render(props);
   }
   export async function unmount() {
     instance.$destroy();
   }
   ```

## 运行项目

1. 启动主应用（默认端口：3000）：
   ```bash
   cd main-app && npm start
   ```
2. 启动子应用（分别在不同端口运行）：
   ```bash
   # React 子应用
   cd react-subapp && npm run dev --port=7101

   # Vue 子应用
   cd vue-subapp && npm run dev --port=7102
   ```

## 注意事项

1. **跨域问题**：确保子应用支持跨域访问（如配置 `webpack-dev-server` 的 `headers`）。
2. **路由冲突**：主应用和子应用的路由前缀需避免重复。
3. **静态资源路径**：子应用需使用相对路径或动态设置 `publicPath`。
4. **全局状态管理**：可通过 `qiankun` 的 `initGlobalState` 实现主应用与子应用的通信。

## 参考文档

- [qiankun 官方文档](https://qiankun.umijs.org/)
- [微前端实践指南](https://micro-frontends.org/)