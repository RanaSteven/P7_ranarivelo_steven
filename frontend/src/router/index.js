import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/AdminSignUp.vue'
import Auth from '../views/Auth.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
