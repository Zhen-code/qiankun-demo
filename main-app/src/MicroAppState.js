import { initGlobalState } from 'qiankun';
export let state = {
  userName: 'qiankun'
}
// 初始化 state
const actions = initGlobalState(state);

actions.onGlobalStateChange((newVal, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  state = newVal
  console.log(state);
});
export const setGlobalState = (state) => actions.setGlobalState(state)
export const offGlobalStateChange = () => actions.offGlobalStateChange();