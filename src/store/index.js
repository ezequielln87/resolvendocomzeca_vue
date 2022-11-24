import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        access: {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setAccess(state, payload) {
            state.access = payload
        }
    },
    actions: {
        setUser(context, payload) {
            context.commit('setUser', payload)
        },
        setAccess(context, payload) {
            context.commit('setAccess', payload)
        },
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getAccess(state) {
            return state.access
        }
    },

})  
