// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import VueChatEngine from 'vue-chat-engine';
import ChatEngineCore from 'chat-engine';
import DefaultChats from './default-chats';
import botInit from './bot';
import util from './util';

Vue.config.productionTip = false;

// Global chat settings are first in the friend list (default-chats.js)
const globalChatSettings = DefaultChats.friends[0];

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
  globalChannel: globalChatSettings.chatKey,
});

const myUuid = util.fourCharID();
const me = {
  name: myUuid,
  uuid: myUuid,
};

// ChatEngine injected into every component instance with the plugin
Vue.use(VueChatEngine, {chatEngine, store});

/**
 * Execute this function when the Vue instance is created
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

    // // Auto add a 1:1 chat to UI when invited
    // // more invite code in (components/FriendList.vue)
    // me.direct.on('$.invite', (event) => {
    //   let uuids = [event.sender.uuid, store.state.me.uuid].sort();
    //   let chatKey = uuids.join('-');

    //   // Don't make the same 1:1 chat if it already exists
    //   if (store.state.chats[chatKey]) {
    //     return;
    //   }

    //   // Make the new 1:1 private Chat
    //   util.newChatEngineChat(
    //     store,
    //     ChatEngine,
    //     {
    //       chatKey,
    //       uuid: event.sender.uuid,
    //     },
    //     true,
    //   );
    // });

    ChatEngine.global.key = globalChatSettings.chatKey;

    // Make a Global Chat and add to the client's UI
    const globalChat = util.newChatEngineChat(
      store,
      ChatEngine,
      globalChatSettings,
    );

    // Get the message history in the global chat
    globalChat.search({
      event: 'message',
      limit: 6,
    });

    store.commit('setCurrentChat', {
      chatKey: globalChat.key,
    });

    // Create a new chat for each user in the friends list
    DefaultChats.friends.forEach(function(friend) {
      const uuids = [friend.uuid, store.state.me.uuid].sort();
      const chatKey = uuids.join('-');

      // Don't make a duplicate chat if it already exists
      if (
        store.state.chats[chatKey] ||
        friend.uuid === 'global'
      ) {
        return;
      }

      // Make a private chat key with the Stephen bot
      if (friend.isChatBot) {
        // Init ChatBot with its own ChatEngine client (bot.js)
        botInit(ChatEngine, friend, chatBotURL);
      }

      // Add the chat key to the Chat object for Vue UI use
      friend.chatKey = chatKey;

      // Make the new 1:1 private Chat
      const myChat = util.newChatEngineChat(
        store,
        ChatEngine,
        friend,
        true,
      );

      // when a user comes online
      myChat.on('$.online.*', (data) => {
        // console.log('New user', data.user.uuid);
      });

      // when a user goes offline
      myChat.on('$.offline.*', (data) => {
        // console.log('User left', data.user.uuid);
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
