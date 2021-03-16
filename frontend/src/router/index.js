import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/AdminSignUp.vue'
import Auth from '../views/Auth.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
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
