import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router

// import Robot from '@/components/Robot.vue'
import Robot from '@/pages/robot/Index.vue'
import Index from '@/pages/index/Index.vue'
import Login from '@/pages/login/Index.vue'

Vue.use(Router)  //Vue全局使用Router

const routes = [
    {
        path: '/',
        name: 'Default',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/robot',
        name: 'Robot',
        component: Robot,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '*',
        name: 'NotFound',
        component: Index
    }
]

export default new Router({
    mode: 'history',
    routes
})
