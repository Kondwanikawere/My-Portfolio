import { createRouter, createWebHistory } from 'vue-router'
import home from './pages/home.vue'
import admin from './pages/admin.vue'
import login from './pages/Auth/signIn.vue'
import notFound from './pages/notFound.vue'
import useUserStore from './store/user'

const routes = [
  {
         path : '/',
         name : 'home',
         component : home
  }, 
  {
      path : '/admin',
      name : 'admin',
      component : admin,
      beforeEnter : async(to, from, next) => {
      try{
        const userStore = useUserStore()
        await userStore.fetchUser()
        next()
      } catch(error) {
        next(false)
      }
      }
  },  

  {
      path : '/login',
      name : 'login',
      component : login
  },
  {
      path : '/:pathMatch(.*)*',
      name : 'notFound',
      component : notFound
  }
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
