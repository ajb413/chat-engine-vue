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
const pub = '';
const sub = '';

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
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
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

    /**
     * Event handler for new messages in the default chat
     * @param {Object} message Message object from the chat engine message event
     */
    function onMessage(message) {
      console.log('onMessage', message);
      let messageInDOM = {
        text: message.data.text || '',
        time: message.data.time || 0,
        who: 'them',
      };

      // eslint-disable-next-line
      // if I happened to send the message, use the special template for myself
      if (message.sender.uuid == me.uuid) {
        messageInDOM.who = 'me';
      }
    }

    ChatEngine.on('$.ready', function(data) {
      // store my new user as `me`
      let me = data.me;
      store.commit('setMe', {me});

      ChatEngine.global.search({
        event: 'message',
        limit: 6,
      }).on('message', onMessage);

      ChatEngine.global.key = store.state.friends[0].chatKey;

      store.commit('setCurrentChat', {
        chatKey: ChatEngine.global.key,
      });

      // Create a new chat for each user in the friends list
      store.state.friends.forEach(function(friend) {
        if (!store.state.chats[friend.chatKey]) {
          // create a new ChatEngine Chat
          let myChat = new ChatEngine.Chat(friend.chatKey);

          // when we recieve messages in this chat, render them
          myChat.on('message', onMessage);

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
