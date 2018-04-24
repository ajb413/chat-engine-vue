<template>
  <div class="message-input">
    <textarea
      ref="messageInput"
      placeholder="message..."
      maxlength="20000"
      @keydown.enter="submitMessage"
      @keyup="isTyping"
    ></textarea>
  </div>
</template>

<script>
import {EventBus} from '../event-bus.js';

export default {
  name: 'message-input',
  data() {
    return {};
  },
  created() {
    const thisComponent = this;

    // Focus on the text input, and clear it, when a chat is selected
    EventBus.$on('focus-input', (event) => {
      thisComponent.$refs.messageInput.focus();
      thisComponent.$refs.messageInput.value = '';
    });

    this.$nextTick(() => {
      thisComponent.$refs.messageInput.focus();
    });
  },
  methods: {
    isTyping(event) {
      const state = this.$store.state;
      const currentChatObject = state.chats[state.currentChat];

      // Trigger the typing indicator start
      if (
        currentChatObject.typingIndicator &&
        event.key !== 'Enter'
      ) {
        currentChatObject.typingIndicator.startTyping();
      }
    },
    submitMessage(event) {
      if (!event.shiftKey) {
        event.preventDefault();
      } else {
        return;
      }

      // If the message body is empty, do not submit
      if (event.target.value.length === 0) {
        return;
      }

      const state = this.$store.state;
      const currentChatObject = state.chats[state.currentChat];

      // Only display typing indicator in private 1:1 chats
      if (currentChatObject.isPrivate && currentChatObject.typingIndicator) {
        currentChatObject.typingIndicator.stopTyping();
      }

      // Send textarea input as message with ChatEngine
      // Use Vuex (in store.js) to send the message
      this.$store.dispatch('sendMessage', {
        chat: this.$store.state.currentChat, // a chat key
        message: {
          text: event.target.value,
        },
      });

      // Reset the text input
      event.target.value = '';
    },
  },
};
</script>

<style scoped>
.message-input {
  display: table-row;
  width: 100%;
  height: 26px;
}

textarea {
  width: 98%;
  height: 28px;
  padding: 0 5px;
  margin: 0;
  box-sizing: border-box;
  line-height: 20pt;
  resize: none;
  outline: none;
  font-size: 14px;
  border: solid 1px #AAAAAA;
  border-radius: 3px;
  font-family: Helvetica;
}
</style>
