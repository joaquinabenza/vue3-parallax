import { createMemoryHistory, createRouter, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', redirect: '/'},
  { path: '/home', redirect: '/' },
  { path: '/', component: () => import('./Views/Home.vue') },
  { path: '/zoom', component: () => import('./Views/Zoom.vue') },
  { path: '/Cards', component: () => import('./Views/Cards.vue') },
  { path: '/parallax-controller', component: () => import('./Views/ParallaxController.vue') }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})