import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
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
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/adminHome',
    name: 'AdminHome',
    component: () => import('../views/AdminHome.vue')
  },
  {
    path: '/adminComments',
    name: 'AdminComments',
    component: () => import('../views/AdminComments.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
