import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  chats: {},
  chatMessages: {},
  currentChat: '',
  me: {},
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setMe(state, {me}) {
    state.me = me;
  },
  setCurrentChat(state, {chatKey}) {
    state.currentChat = chatKey;
  },
  setFriends(state, {friends}) {
    if (!state.friends) {
      state.friends = [];
    }
    state.friends = state.friends.concat(friends);
  },
  newChat(state, {chat}) {
    console.log(chat.key);
    state.chats[chat.key] = chat;
  },
  CHATENGINE_message(state, {event, sender, chat, data}) {
    let key = chat.key || chat.chat.key;

    if (!state.chatMessages[key]) {
      Vue.set(state.chatMessages, key, []);
    }

    let myUuid = this.state.me.uuid;
    let message = data;

    if (sender.uuid === myUuid) {
      message.who = 'me';
    } else {
      message.who = 'them';
    }

    state.chatMessages[key].push(message);
    state.chatMessages[key].sort((msg1, msg2) => {
      return msg1.time > msg2.time;
    });
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  sendMessage(context, {chat, message}) {
    // emit the `message` event to everyone in the Chat
    context.state.chats[chat].emit('message', message);
  },
};

// getters are functions
const getters = {
  getMessages(messages) {
    if (!Array.isArray(messages)) {
      return;
    }

    for (let message of messages) {
      mutations.newMessage(null, {
        message,
      });
    }
  },
  getCurrentChat(state) {
    return state.currentChat;
  },
  getMessages(state) {
    return state.chatMessages[state.currentChat];
  },
  getChat: (state) => state.chats[state.currentChat],
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
