<template>
  <div
    class="message-bubble"
    :class="me"
  >
    <span
      class="from"
      :class="isGlobal"
    >{{ who }}</span>
    <br :class="me">
    <span
      class="message-text"
    >{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'message-bubble',
  props: ['time', 'text', 'who'],
  computed: {
    isGlobal() {
      let result = false;

      if (this.$store.state.currentChat === this.$chatEngine.global.key) {
        result = true;
      }

      return result ? '' : 'display-none';
    },
    me() {
      let result = false;

      if (this.$chatEngine.me.uuid === this.who) {
        result = true;
      }

      return result ? 'me' : '';
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.message-bubble {
  display: block;
  max-width: 40%;
  margin-bottom: 4px;
  float: left;
  clear: both;
}

.message-text {
  padding: 8px;
  margin: 4px;
  text-align: left;
  background-color: #dfdfdf;
  border-radius: 4px;
}

.message-bubble.me {
  float: right;
}

.message-bubble.me .message-text {
  background-color: #c6c6c6;
}

.from {
  float: left;
  margin: 4px;
  font-size: 10px;
  color: #9DA7AF;
}

.message-bubble span {
  display: block;
}

.display-none,
.message-bubble.me .from,
br.me {
  display: none;
}
</style>
