<template>
  <div
    class="chat-log"
    ref="chatLogContainer"
  >
    <message-bubble
      v-for="message in messages"
      :key="message.key"
      :time="message.time"
      :text="message.text"
      :who="message.who"
    ></message-bubble>
    <div
      class="typing-indicator"
      :class="showTypingIndicator ? 'typing-on' : 'typing-off'"
    >
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBubble from '@/components/MessageBubble';
import {EventBus} from '../event-bus.js';

/**
 * Auto scrolls the chat log to the bottom when a new message is received or if
 *     the typing indicator's "typing-start" event fires.
 */
function scrollBottom() {
  this.$el.scrollTo(0, this.$el.scrollHeight);
}

export default {
  name: 'chat-log',
  components: {MessageBubble},
  data() {
    return {
      showTypingIndicator: false,
    };
  },
  computed: {
    messages() {
      this.$nextTick(scrollBottom);
      return this.$store.state.chatMessages[this.$store.state.currentChat];
    },
  },
  created() {
    const thisComponent = this;

    // Add a typing indicator visual to the UI
    EventBus.$on('typing-start', (chatKey) => {
      if (this.$store.state.currentChat === chatKey) {
        thisComponent.showTypingIndicator = true;
        this.$nextTick(scrollBottom);
      }
    });

    // Remove the typing indicator visual from the UI
    EventBus.$on('typing-stop', (chatKey) => {
      if (this.$store.state.currentChat === chatKey) {
        thisComponent.showTypingIndicator = false;
      }
    });

    // Scroll the chat log to the bottom
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

.typing-indicator {
  display: block;
  width: 36px;
  height: 36px;
  margin-bottom: 4px;
  float: left;
  clear: both;
}

.typing-on {
  display: block;
}

.typing-off {
  display: none;
}
</style>
