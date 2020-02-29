import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path: '/Commodity',
        name: 'Commodity',
        component: () => import('../views/Commodity.vue')
      },
      {
        path: '/Evaluate',
        name: 'Evaluate',
        component: () => import('../views/Evaluate.vue')
      },
      {
        path: '/Merchant',
        name: 'Merchant',
        component: () => import('../views/Merchant.vue')
      },
      {
        path: '/Pay',
        name: 'Pay',
        component: () => import('../views/Pay.vue')
      },
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
