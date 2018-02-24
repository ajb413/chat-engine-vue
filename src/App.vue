<template>
  <div id="app">
    <chat-container/>
  </div>
</template>

<script>

import ChatContainer from '@/components/ChatContainer'
import ChatLog from '@/components/ChatLog'
import FriendList from '@/components/FriendList'
import MessageInput from '@/components/MessageInput'

export default {
  name: 'App',
  components: {
    ChatContainer,
    ChatLog,
    FriendList,
    MessageInput
  }
}

</script>

<style>
body {
  background-image: url('https://www.pubnub.com/sites/all/themes/pubnub/images/filter-blocks-bg.png')
}

#app {
  font-family: Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #545E66;
  margin-top: 60px;
}
</style>
