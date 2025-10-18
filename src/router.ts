import { createMemoryHistory, createRouter, RouteRecordRaw} from 'vue-router'

import HomeView from './Views/Home.vue'
import ZoomView from './Views/Zoom.vue'
import CardsView from './Views/Cards.vue'
import ParallaxControllerView from './Views/ParallaxController.vue'

const routes: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', redirect: '/'},
  { path: '/home', redirect: '/' },
  { path: '/', component: HomeView },
  { path: '/zoom', component: ZoomView },
  { path: '/Cards', component: CardsView },
  { path: '/parallax-controller', component: ParallaxControllerView }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})