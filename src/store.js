import Vue from 'vue';
import Vuex from 'vuex';
import TestData from './test-data';

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
  newChat(state, {chatKey, chatValue}) {
    state.chats[chatKey] = chatValue;
  },
  CHATENGINE_message(state, {event, sender, chat, data}) {
    let channel = chat.config.channel;
    if (!state.chatMessages[channel]) {
      Vue.set(state.chatMessages, channel, []);
    }

    let myUuid = this.state.me.uuid;
    let message = data;

    if (sender.uuid === myUuid) {
      message.who = 'me';
    } else {
      message.who = 'them';
    }

    state.chatMessages[channel].push(message);
    state.chatMessages[channel].sort((msg1, msg2) => {
      return msg1.time > msg2.time;
    });
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  CHATENGINE_SEND_MESSAGE(context, {chat, message}) {
    // emit the `message` event to everyone in the Chat
    context.state.chats[chat].emit('message', message);
  },
  CHATENGINE_NEW_CHAT(context, {chatKey}) {
    // create a new chat and put it in the store
    debugger;
    let myChat = new ChatEngine.Chat(chatKey);

    store.commit('newChat', {
      chatKey: chatKey,
      chatValue: myChat,
    });
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
  getFriendsList(friends) {
    if (!state.friends) {
      state.friends = [];
    }
    state.friends = state.friends.concat(friends);
  },
  getCurrentChat(state) {
    // debugger;
    return state.currentChat;
  },
  getMessages(state) {
    // debugger;
    return state.chatMessages[state.currentChat];
  },
  // getMessages: (state) => state.chatMessages[state.currentChat],
  getChat: (state) => state.chats[state.currentChat],
};

// Init with past messages + FL from server
getters.getFriendsList(TestData.friends);
// getters.getMessages(TestData.messages);

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
