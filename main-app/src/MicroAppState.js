import { initGlobalState } from 'qiankun';
export let state = {
  userName: 'qiankun',
  app: null,
  sidebarVisible: true
}
// 初始化 state
const actions = initGlobalState(state);

actions.onGlobalStateChange((newVal, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  state = newVal
  console.log(state);
});
export const setGlobalState = (newState) => {  
  actions.setGlobalState(newState)
}
export const onGlobalStateChange = (callback) => { return actions.onGlobalStateChange(callback); };
export const offGlobalStateChange = () => actions.offGlobalStateChange();