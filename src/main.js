// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import VueChatEngine from 'vue-chat-engine';
// import ChatEngineSetup from './scripts/ChatEngineSetup';

Vue.config.productionTip = false;

// PubNub Config
const pnConfig = {
  publishKey: '',
  subscribeKey: '',
};

// Chat Engine Config
const chatEngineConfig = {
  globalChannel: 'chatengine-vue-demo-global',
  enableSync: true,
};

const me = {
  // eslint-disable-next-line
  avatar: 'https://lh3.googleusercontent.com/-nr6r2jf30wY/AAAAAAAAAAI/AAAAAAAAAio/mthZ3J53MWI/s120-p-rw-no/photo.jpg',
  name: 'Adam Bavosa',
  uuid: 'adamb',
  // eslint-disable-next-line
  lastMessage: 'No I can\'t come to your party tomorrow. I really don\'t like you so why should I be near you ever?',
};

// Chat Engine injected into every component instance
Vue.use(VueChatEngine, {pnConfig, chatEngineConfig, store});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: {App},
  template: '<App/>',
  created() {
    const ChatEngine = this.$chatEngine;
    const store = this.$store;
    const chatKey = 'chatengine-vue-demo-chat';

    ChatEngine.connect(me.uuid, me);

    /**
     * Event handler for new messages in the default chat
     * @param {Object} message Message object from the chat engine message event
     */
    function onMessage(message) {
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

      // store.commit('newMessage', {
      //   message: messageInDOM,
      //   chat: chatKey,
      // });
    }

    ChatEngine.on('$.ready', function(data) {
      // store my new user as `me`
      let me = data.me;

      // create a new ChatEngine Chat
      let myChat = new ChatEngine.Chat(chatKey);

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

      // wait for our chat to be connected to the internet
      myChat.on('$.connected', () => {
        // search for 15 old `message` events
        myChat.search({
          event: 'message',
          limit: 15,
        }).on('message', onMessage);
      });

      store.commit('setMe', {me});

      store.commit('newChat', {
        chatKey: myChat.channel,
        chatValue: myChat,
      });

      store.commit('setCurrentChat', {
        chatKey: myChat.channel,
      });


      // store.dispatch('CHATENGINE_NEW_CHAT', {
      //   chatKey: 'asdasdasd'
      // });
    });
  },
});
