// import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';
import './MicroAppState'
import { state, setGlobalState } from './MicroAppState'
import { process } from 'qiankun/es/sandbox/patchers/css';
addGlobalUncaughtErrorHandler((event) => console.log(event, '全局错误捕获'));
const getActiveRule = (hash) => (location) => location.hash.startsWith(hash)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// debugger;
registerMicroApps([
  // {
  //   name: 'vueApp',
  //   entry: process.env.NODE_ENV === 'development' ?'//localhost:8080':'/vue1/',
  //   container: '#container',
  //   activeRule: '/vue',
  //   props: state
  // },
  {
    name: 'app-vue',
    entry: process.env.NODE_ENV === 'development' ? '//localhost:8080/' : '/child/vue-history/', // 根据环境切换入口地址
    container: '#container',
    activeRule: '/app-vue-history'
  },
  {
    name: 'react-app',
    entry: process.env.NODE_ENV === 'development' ?'//localhost:3002':'/child/react-history/',
    container: '#container',
    activeRule: '/react',
    props: state
  },
], {
  afterMount: (app) => {
    // console.log('afterMount', app.name)
    // setGlobalState({
    //   userName: 'Admin'
    // })
  }
});
// // 启动 qiankun
start({
  // prefetch: true,
  // sandbox: {
  //   // strictStyleIsolation: true,
  //   // experimentalStyleIsolation: true,
  // }
  // strictStyleIsolation: true,
  // experimentalStyleIsolation: true
  sandbox: false
});
