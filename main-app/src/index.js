import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun';
import './MicroAppState'
import { state, setGlobalState } from './MicroAppState'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// debugger;
registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:3001',
    container: '#container',
    activeRule: '/react',
    props: state
  },
  {
    name: 'vueApp',
    entry: '//localhost:8080',
    container: '#container',
    activeRule: '/vue',
    props: state
  },
], {
  afterMount: (app) => {
    console.log('afterMount', app.name)
    setGlobalState({
      userName: 'Admin'
    })
  }
});
// // 启动 qiankun
start({
  prefetch: true,
  // strictStyleIsolation: true,
  // experimentalStyleIsolation: true
  // sandbox: true
});
