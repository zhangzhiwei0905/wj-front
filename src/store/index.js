import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: sessionStorage.getItem('token' || '[]') == null ? '' : JSON.parse(sessionStorage.getItem('token' || '[]')).username
    }
  },
  mutations: {
    login(state, user) {
      state.user = user
      sessionStorage.setItem("token", JSON.stringify(user))
    },
    logout(state, user) {
      sessionStorage.removeItem("token")
    }
  }
})
