import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    data:{}
  },
  mutations: {
    // Mutations 用于变更状态
    SET_LOGIN(state, status) {
      state.isLogin = status
    },
    GET_INFO(state,status){
      state.data = status.data.data
      console.log('state.data',state.data);
    }
  },
  actions: {
    // Actions 用于提交 mutation
    setLogin({ commit }, status) {
      commit('SET_LOGIN', status)
    },
    getInfo({ commit }, status){
      console.log(status);
      axios({
        url:'/api/outstanding-kid/kid/getAllUsers',
        method:'get'
      }).then((data)=>{
        console.log('store中的data',data);
        commit('GET_INFO',data)
      }).catch((error)=>{
        console.dir(error);
      })

    }
  },
  getters: {
    // Getters 用于从 store 中的 state 中派生出一些状态
    isLogin: state => state.isLogin
  },
  plugins: [
    createPersistedState({
        key: 'your_unique_key', // 用于存储状态的 localStorage 键名，默认为 vuex
        paths: ['isLogin'], // 你想要持久化的状态数组
        storage: window.localStorage, // 选择存储介质，默认为 localStorage
        // 其他可选配置...
    })
]
})