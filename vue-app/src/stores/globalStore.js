import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    globalState: {},
  }),
  actions: {
    updateGlobalState(state) {
      this.globalState = state;
      // console.log(this.globalState,'----');
      
    },
  },
});