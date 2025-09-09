import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/app-vue-history/' : '/'),//,
  routes
})
export default router
