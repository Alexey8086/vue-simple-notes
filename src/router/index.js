import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import MainPG from '@/views/Main.vue'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import SettingsPG from '@/views/Settings.vue'
import HomePG from '@/views/Home.vue'
import NotePG from '@/views/Note.vue'
import NotFound from '@/views/404.vue'

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
    component: SignUp,
    meta: {
      layout: 'main',
      auth: false,
      signUp: true,
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      layout: 'main',
      auth: false,
      signIn: true,
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPG,
    meta: {
      layout: 'main',
      auth: true,
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePG,
    meta: {
      layout: 'sidebar',
      auth: true,
    }
  },
  {
    path: '/note/:id',
    name: 'TheNote',
    component: NotePG,
    meta: {
      layout: 'sidebar',
      auth: true,
      // isNewNote: false,
    }
  },
  {
    path: '/note/new',
    name: 'newNote',
    component: NotePG,
    meta: {
      layout: 'sidebar',
      auth: true,
      // isNewNote: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound,
    meta: {
      layout: 'main',
      auth: false,
    }
  },
  
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  // получаем boolean значение - данной странице нужна авторизация или нет
  const needAuth = to.meta.auth

  // если странице требуется авторизация и авторизация есть, то продолжаем
  // если авторизации нет (а она необходимо для этого роута), то делаем редирект на страницу входа в систему
  if (needAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if(needAuth && !store.getters['auth/isAuthenticated']) {
    next('/signin?message=access_denied')
  } else {
    next()
  }
})

export default router