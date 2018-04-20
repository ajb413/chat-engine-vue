<template>
  <div class="message-input">
    <textarea
      ref="messageInput"
      placeholder="message..."
      maxlength="20000"
      @keydown.enter="submit"
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

    EventBus.$on('focus-input', (event) => {
      thisComponent.$refs.messageInput.focus();
    });

    this.$nextTick(() => {
      thisComponent.$refs.messageInput.focus();
    });
  },
  methods: {
    submit(e) {
      if (!e.shiftKey) {
        e.preventDefault();
      } else {
        return;
      }

      let text = e.target.value;
      e.target.value = '';

      // If the message body is empty, do not submit
      if (text.length === 0) {
        return;
      }

      let message = {
        time: new Date().getTime(),
        text,
      };

      this.$store.dispatch('sendMessage', {
        chat: this.$store.state.currentChat,
        message,
      });
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
  height: 28px;
  width: 98%;
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
