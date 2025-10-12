import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'

import HomeView from './Views/Home.vue'
import ZoomView from './Views/Zoom.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/parallax-zoom', component: ZoomView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})