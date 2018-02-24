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

export default {
  name: 'chat-log',
  components: { MessageBubble },
  data () {
    return {
      messages: [
        {
          who: 'them',
          time: 1519420960740,
          text: 'hey'
        },
        {
          who: 'them',
          time: 1519420960741,
          text: 'hey'
        },
        {
          who: 'them',
          time: 1519420960742,
          text: 'hey'
        },
        {
          who: 'them',
          time: 1519420960743,
          text: 'hey'
        },
        {
          who: 'them',
          time: 1519420960751,
          text: 'hey'
        },
        {
          who: 'them',
          time: 1519420960752,
          text: 'hey'
        },
        {
          who: 'them',
          time: 1519420960753,
          text: 'hey'
        },
        {
          who: 'them',
          time: 1519420960754,
          text: 'hey'
        },
        {
          who: 'them',
          time: 1519420960763,
          text: 'hey wanna come to my party?'
        },
        {
          who: 'them',
          time: 1519420960765,
          text: 'thursday at 8'
        },
        {
          who: 'me',
          time: 1519420960764,
          text: 'when is it'
        },
        {
          who: 'me',
          time: 1519420960766,
          text: "No I can't come to your party tomorrow. I really don't like you so why should I be near you ever?"
        }
      ].sort((a, b) => { return a.time > b.time })
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
