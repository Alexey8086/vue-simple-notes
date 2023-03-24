import { createRouter, createWebHistory } from 'vue-router'
// import store from '@/store'
import MainPG from '@/views/Main.vue'
import AuthPG from '@/views/Auth.vue'
import SettingsPG from '@/views/Settings.vue'
import HomePG from '@/views/Home.vue'
import NotePG from '@/views/Note.vue'

const routes = [
  {
    path: '/',
    name: 'MainPG',
    component: MainPG,
    meta: {
      layout: 'main',
      auth: false,
      signup: undefined,
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    // component: AuthPG,
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'main',
      auth: false,
      signup: true,
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: AuthPG,
    meta: {
      layout: 'main',
      auth: false,
      signup: false,
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPG,
    meta: {
      layout: 'main',
      auth: true,
      signup: undefined,
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePG,
    meta: {
      layout: 'sidebar',
      auth: false,
      signup: undefined,
    }
  },
  {
    path: '/note',
    name: 'Note',
    component: NotePG,
    meta: {
      layout: 'sidebar',
      auth: true,
      signup: undefined,
    }
  },
  
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

// router.beforeEach((to, from, next) => {
//   // получаем boolean значение - данной странице нужна авторизация или нет
//   const requireAuth = to.meta.auth

//   // если странице требуется авторизация и авторизация есть, то продолжаем
//   if (requireAuth && store.getters['auth/isAuthenticated']) {
//     next()
//   } else if(requireAuth && !store.getters['auth/isAuthenticated']) {
//     next('/auth?message=auth')
//   } else {
//     next()
//   }
// })

export default router
