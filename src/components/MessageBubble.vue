<template>
  <span
    class="message-bubble"
    :class="who"
  >{{ text }}</span>
</template>

<script>
export default {
  name: 'message-bubble',
  props: ['time', 'text', 'who'],
  data () {
    return {}
  }
}
</script>

<style scoped>
.message-bubble {
  display: block;
  max-width: 40%;
  padding: 2%;
  margin: 1%;
  text-align: left;
  background-color: #DFDFDF;
  border-radius: 4px;
  float: left;
  clear: both;
}

.message-bubble.me {
  float: right;
  background-color: #FFFFFF;
}
</style>
