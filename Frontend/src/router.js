import { createRouter, createWebHistory } from 'vue-router'
import home from './pages/home.vue'

const routes = [
  {
         path : '/',
         name : 'home',
         component : home
  },  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
})

export default router
