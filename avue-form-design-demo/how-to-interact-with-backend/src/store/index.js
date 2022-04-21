import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate' // 缓存vuex

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [{
      id: '1',
      key: '表单key',
      name: '表单名称',
      content: ''
    }],
  },

  mutations: {
    SET_LIST: (state, list) => {
      state.list = list
    },
  },

  actions: {
    GetData({ state }) { // 模拟获取列表
      return new Promise((resolve) => {
        resolve(state.list)
      })
    },
    SubmitData({ commit, state }, data) { // 模拟提交/更新
      return new Promise((resolve, reject) => {
        if (!data) reject('参数错误')

        let list = state.list

        if (data.id) {
          const index = list.findIndex(l => l.id == data.id)
          if (index != -1) {
            list.splice(index, 1, data)
          }
        } else {
          data.id = Date.now() + '_' + Math.ceil(Math.random() * 99999)
          list.push(data)
        }
        commit("SET_LIST", list)
        resolve()
      })
    },
    DeleteData({ commit, state }, data) { // 模拟删除
      return new Promise((resolve, reject) => {
        if (!data) reject('参数错误')
        let list = state.list

        if (data.id) {
          const index = list.findIndex(l => l.id == data.id)
          if (index != -1) {
            list.splice(index, 1)
            commit("SET_LIST", list)
            resolve()
          }
        }
        reject('删除失败')
      })
    }
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})