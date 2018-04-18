<template>
  <div class="chat-log">
    <message-bubble
      v-for="message in messages"
      :key="message.key"
      :time="message.time"
      :text="message.text"
      :who="message.who"
    ></message-bubble>
  </div>
</template>

<script>
import MessageBubble from '@/components/MessageBubble';

/**
 * Auto scrolls the chat log to the bottom when a new message is received.
 */
function scrollBottom() {
  this.$el.scrollTo(0, this.$el.scrollHeight);
}

export default {
  name: 'chat-log',
  components: {MessageBubble},
  computed: {
    messages() {
      this.$nextTick(scrollBottom);
      return this.$store.state.chatMessages[this.$store.state.currentChat];
    },
  },
  created() {
    this.$nextTick(scrollBottom);
  },
};
</script>

<style scoped>
.chat-log {
  display: block;
  height: inherit;
  width: 100%;
  padding: 2% 4%;
  box-sizing: border-box;
  overflow-y: scroll;
}

.chat-log::-webkit-scrollbar {
  display: none;
}
</style>
