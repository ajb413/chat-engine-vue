// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import VueChatEngine from 'vue-chat-engine';
import ChatEngineCore from 'chat-engine';
import DefaultChat from './default-chats';

// Sets the default global and 1:1 chats
store.commit('setFriends', {
  friends: DefaultChat.friends,
});

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
  enableSync: true,
});

Vue.config.productionTip = false;

/**
 * Get a new UUID
 * @return {string} A 4 character UUID for PubNub and to give to friends.
 */
function fourCharUUID() {
  const maxLength = 4;
  const possible = 'abcdef0123456789';
  let text = '';

  for (let i = 0; i < maxLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

const myUuid = fourCharUUID();

const me = {
  name: myUuid,
  uuid: myUuid,
};

// Chat Engine injected into every component instance
Vue.use(VueChatEngine, {chatEngine, store});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: {App},
  template: '<App/>',
  created() {
    const ChatEngine = this.$chatEngine;
    const store = this.$store;

    ChatEngine.connect(me.uuid, me);


    ChatEngine.on('$.ready', function(data) {
      // store my new user as `me`
      let me = data.me;
      store.commit('setMe', {me});

      ChatEngine.global.search({
        event: 'message',
        limit: 6,
      });

      ChatEngine.global.key = store.state.friends[0].chatKey;

      store.commit('setCurrentChat', {
        chatKey: ChatEngine.global.key,
      });

      // Create a new chat for each user in the friends list
      store.state.friends.forEach(function(friend) {
        if (!store.state.chats[friend.chatKey]) {
          // create a new ChatEngine Chat
          let myChat = new ChatEngine.Chat(friend.chatKey);

          // when a user comes online, render them in the online list
          myChat.on('$.online.*', (data) => {
            // $('#people-list ul').append(peopleTemplate(data.user));
          });

          // when a user goes offline, remove them from the online list
          myChat.on('$.offline.*', (data) => {
            // $('#people-list ul').find('#' + data.user.uuid).remove();
          });

          myChat.key = friend.chatKey;

          store.commit('newChat', {
            chat: myChat,
          });
        }
      });
    });
  },
});
