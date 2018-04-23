// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import VueChatEngine from 'vue-chat-engine';
import ChatEngineCore from 'chat-engine';
import typingIndicator from './typing-indicator';
import DefaultChat from './default-chats';
import botInit from './bot';
import util from './util';

Vue.config.productionTip = false;

// Sets the default global and 1:1 chats
store.commit('setFriends', {
  friends: DefaultChat.friends,
});

// ChatBot REST endpoint powered by PubNub Functions and Amazon Lex
const chatBotURL = 'https://pubsub.pubnub.com/v1/blocks/sub-key/sub-c-eb9ac3fa-248e-11e8-bb29-5a43d096f02f/chat-bot';

// Init ChatEngine with PubNub
const pub = 'pub-c-bc85cb90-3bb6-4b48-9f2e-73e7a60a7be5';
const sub = 'sub-c-eb9ac3fa-248e-11e8-bb29-5a43d096f02f';

if (!pub || !sub) {
  console.error('ChatEngine: PubNub Keys are missing.');
}

const chatEngine = ChatEngineCore.create({
  publishKey: pub,
  subscribeKey: sub,
}, {
  globalChannel: store.state.friends[0].chatKey,
});

const myUuid = util.fourCharUUID();
const me = {
  name: myUuid,
  uuid: myUuid,
};

// ChatEngine injected into every component instance
Vue.use(VueChatEngine, {chatEngine, store});

/**
 * Execute this function when the Vue instance is created.
 */
function created() {
  const ChatEngine = this.$chatEngine;
  const store = this.$store;

  ChatEngine.connect(me.uuid, me);

  document.addEventListener('beforeunload', function() {
    ChatEngine.disconnect();
  });

  ChatEngine.on('$.ready', function(data) {
    // store my new user as `me`
    let me = data.me;
    store.commit('setMe', {me});

    // Auto add a 1:1 chat to UI when invited
    me.direct.on('$.invite', (event) => {
      let uuids = [event.sender.uuid, store.state.me.uuid].sort();
      let chatKey = uuids.join('-');

      // Don't make the same 1:1 chat if it already exists
      if (store.state.chats[chatKey]) {
        return;
      }

      let privateChat = new ChatEngine.Chat(chatKey, true);

      privateChat.key = chatKey;

      // Add the Typing Indicator ChatEngine plugin to this 1:1 chat.
      typingIndicator(privateChat);

      // Add this friend to the client's friend list
      store.commit('setFriends', {
        friends: [{
          name: `Friend: ${event.sender.uuid}`,
          chatKey,
        }],
      });

      store.commit('newChat', {
        chat: privateChat,
      });
    });

    ChatEngine.global.search({
      event: 'message',
      limit: 6,
    });

    ChatEngine.global.key = store.state.friends[0].chatKey;

    store.commit('setCurrentChat', {
      chatKey: ChatEngine.global.key,
    });

    // Create a new chat for each user in the friends list
    store.state.friends.forEach(function(friend, index) {
      // Make a private chat key with the Stephen bot
      if (!friend.chatKey) {
        let uuids = [friend.uuid, store.state.me.uuid].sort();
        friend.chatKey = uuids.join('-');

        store.commit('updateFriendChatKey', {
          friendIndex: index,
          chatKey: friend.chatKey,
        });

        // Init ChatBot with its own ChatEngine instance (bot.js)
        botInit(ChatEngine, friend, chatBotURL);
      }

      // Don't make the same 1:1 chat if it already exists
      if (store.state.chats[friend.chatKey]) {
        return;
      }

      // Create a new ChatEngine Chat, true for private chat
      let myChat = new ChatEngine.Chat(friend.chatKey, true);

      // Add the Typing Indicator ChatEngine plugin to this 1:1 chat.
      typingIndicator(myChat);

      // when a user comes online
      myChat.on('$.online.*', (data) => {
        console.log('New user', data.user.uuid);
      });

      // when a user goes offline
      myChat.on('$.offline.*', (data) => {
        console.log('User left', data.user.uuid);
      });

      myChat.key = friend.chatKey;

      store.commit('newChat', {
        chat: myChat,
      });
    });
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: {App},
  template: '<App/>',
  created,
});
