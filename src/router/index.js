import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // excel 索引页面
  {
    path: '/excel/index',
    name: 'excel',
    component: () => import('../views/excel/index.vue'),
  },
  {
    path: '/excel/basic',
    name: 'BasicExcel',
    component: () => import('../views/excel/basic.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
