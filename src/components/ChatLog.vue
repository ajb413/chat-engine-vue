<template>
  <div class="chat-log">
    <div is="message-bubble"
      v-for="message of messages"
      :key="message.key"
      :time="message.time"
      :text="message.text"
      :who="message.who"
    ></div>
  </div>
</template>

<script>

import MessageBubble from '@/components/MessageBubble'

function scrollBottom () {
  this.$el.scrollTo(0, this.$el.scrollHeight)
}

export default {
  created () {
    this.$nextTick(scrollBottom)
  },
  name: 'chat-log',
  components: { MessageBubble },
  data () {
    const messages = this.$store.state.messages
    return { messages }
  },
  watch: {
    messages () {
      this.$nextTick(scrollBottom)
    }
  }
}
</script>

<style scoped>
.chat-log {
  display: block;
  height: inherit;
  width: 100%;
  padding: 4%;
  box-sizing: border-box;
  overflow-y: scroll;
}

.chat-log::-webkit-scrollbar {
  display: none;
}
</style>
