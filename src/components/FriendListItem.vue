<template>
  <div class="friend-list-item" @click="onFocus">
    <img :src="avatarSrc" />
    <div class="text">
      <span class="name">{{ name }}</span>
      <span class="lastMessage">{{ lastMessage }}</span>
    </div>
  </div>
</template>

<script>
import defaultProfileImg from '@/assets/profile.png';
import globalProfileImg from '@/assets/pn.png';

export default {
  name: 'friend-list-item',
  props: {
    name: {},
    avatar: {
      default: defaultProfileImg,
    },
    chat: '',
  },
  data() {
    return {};
  },
  methods: {
    onFocus(event) {
      this.$store.commit('setCurrentChat', {chatKey: this._props.chat});
    },
  },
  computed: {
    lastMessage() {
      let messages = this.$store.state.chatMessages[this.chat];

      if (messages && messages.length) {
        return messages[messages.length-1].text;
      } else {
        return '';
      }
    },
    avatarSrc() {
      if (this.avatar === 'global') {
        return globalProfileImg;
      } else if (this.avatar) {
        return this.avatar;
      } else {
        return defaultProfileImg;
      }
    },
  },
};
</script>

<style scoped>
.friend-list-item {
  width: 100%;
  height: 70px;
  padding: 5%;
  box-sizing: border-box;
  border-bottom: solid 1px #CDCDCD;
  background: linear-gradient(141deg, #314460 0%, #0c384c 75%);
  cursor: pointer;
}

.friend-list-item img {
  border-radius: 50%;
  height: 100%;
  margin-right: 5%;
  float: left;
}

.friend-list-item span {
  display: block;
  color: #FFFFFF;
  text-align: left;
}

.text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

span.name {
  font-weight: bold;
  font-size: 16px;
}

span.lastMessage {
  color: #CFCFCF;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
