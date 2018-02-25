import Vue from 'vue'
import Vuex from 'vuex'
import TestData from './test-data'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  newMessage (observer, payload) {
    if (!state.messages) {
      state.messages = []
    }

    state.messages.push(payload.message)
    state.messages.sort((a, b) => { return a.time > b.time })
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {}

// getters are functions
const getters = {
  getMessages (messages) {
    if (!Array.isArray(messages)) {
      return
    }

    for (let message of messages) {
      mutations.newMessage(null, { message })
    }
  },
  getFriendsList (friends) {
    if (!state.friends) {
      state.friends = []
    }
    state.friends = state.friends.concat(friends)
  }
}

// Init with past messages + FL from server
getters.getFriendsList(TestData.friends)
getters.getMessages(TestData.messages)

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
