import { createMemoryHistory, createRouter, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', redirect: '/'},
  { path: '/home', redirect: '/' },
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/zoom', component: () => import('./views/Zoom.vue') },
  { path: '/Cards', component: () => import('./views/Cards.vue') },
  { path: '/parallax-controller', component: () => import('./views/ParallaxController.vue') }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})