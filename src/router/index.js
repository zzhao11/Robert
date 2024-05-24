import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router

// import Robot from '@/components/Robot.vue'
import Hello from '@/pages/Hello.vue'
import Robot from '@/components/Robot.vue'
import Index from '@/pages/index/Index.vue'

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
    }
]

export default new Router({
    mode: 'history',
    routes
})
