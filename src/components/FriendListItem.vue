<template>
  <div
    class="friend-list-item"
    :class="selected"
    @click="onFocus">
    <img :src="avatarSrc" />
    <div class="text">
      <span class="name">{{ name }}</span>
      <span class="lastMessage">{{ lastMessage }}</span>
    </div>
  </div>
</template>

<script>
import {EventBus} from '../event-bus.js';
import defaultProfileImg from '@/assets/profile.png';
import globalProfileImg from '@/assets/pn.png';

export default {
  name: 'friend-list-item',
  props: {
    name: {},
    avatar: {
      default: defaultProfileImg,
    },
    index: null,
  },
  data() {
    return {};
  },
  methods: {
    onFocus(event) {
      EventBus.$emit('focus-input', event);
      this.$store.commit('setCurrentChat', {chatKey: this.chatKey});
    },
  },
  computed: {
    chatKey() {
      return this.$store.state.friends[this.index].chatKey;
    },
    lastMessage() {
      let messages = this.$store.state.chatMessages[this.chatKey];

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
    selected() {
      return this.$store.state.currentChat === this.chatKey ? 'selected' : '';
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
  background: linear-gradient(141deg, #505D74 0%, #15223A 75%);
  cursor: pointer;
}

.selected {
  background: #717C8F;
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
