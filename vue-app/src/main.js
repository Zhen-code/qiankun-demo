import './public-path';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '!!vue-style-loader!css-loader!my-style-loader!element-plus/dist/index.css' 可单独处理element-plus样式，无需在vue.config.js中配置
import { useGlobalStore } from './stores/globalStore';
import { createPinia } from 'pinia'
// createApp(App).use(router).mount('#app')
const pinia = createPinia()
let instance = null;
function render(props = {}) {
  const { container } = props;
   
  instance = createApp(App)
  instance.use(router)
  instance.use(ElementPlus) 
  instance.use(pinia)
  instance.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
  // 保存主应用的setGlobalState方法
  window.setGlobalState = props.setGlobalState;

  // props.onGlobalStateChange((state, prev) => {
  //   // state: 变更后的状态; prev 变更前的状态
  //   console.log(state, prev,'state change');
  //   // const store = useGlobalStore();
  //   // store.updateGlobalState(state);
  // });
}
export async function unmount() {
  console.log('[vue] unmount');
  instance && instance.unmount();
}
