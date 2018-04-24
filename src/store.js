import Vue from 'vue';
import Vuex from 'vuex';
import {EventBus} from './event-bus.js';

Vue.use(Vuex);

const state = {
  chats: {},
  chatMessages: {},
  currentChat: '',
  friends: [],
  me: {},
};

const mutations = {
  setMe(state, {me}) {
    state.me = me;
  },
  setCurrentChat(state, {chatKey}) {
    state.currentChat = chatKey;
  },
  setFriends(state, {friends}) {
    for (let friend of friends) {
      state.friends.push(friend);
    }
  },
  newChat(state, {chat}) {
    if (!chat.key) {
      throw Error('No chat.key defined on the new Chatengine chat Object');
    }
    state.chats[chat.key] = chat;
  },
  CHATENGINE_message(state, {event, sender, chat, data, timetoken}) {
    let key = chat.key || chat.chat.key;

    if (!state.chatMessages[key]) {
      Vue.set(state.chatMessages, key, []);
    }

    let message = data;
    message.who = sender.uuid;
    message.time = timetoken; // timetoken in ChatEngine 0.9.5 or later

    // Force stop the typing indicator
    if (chat.typingIndicator && sender.name !== 'Me') {
      // Handler in Chat Log Component (components/ChatLog.vue)
      EventBus.$emit('typing-stop', chat.key);
    }

    state.chatMessages[key].push(message);
    state.chatMessages[key].sort((msg1, msg2) => {
      return msg1.time > msg2.time;
    });
  },
};

const actions = {
  sendMessage(context, {chat, message}) {
    // emit the `message` event to everyone in the Chat
    context.state.chats[chat].emit('message', message);
  },
};

const getters = {
  getMyUuid: (state) => state.me.uuid,
  getFriends: (state) => state.friends,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
