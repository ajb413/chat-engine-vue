<template>
  <div class="message-input">
    <textarea
      placeholder="message..."
      maxlength="20000"
      minlength="1"
      @keyup.enter="yo"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'message-input',
  data () {
    return {}
  },
  methods: {
    yo: (e) => {
      e.target.value = ''
    }
  }
}
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
}
</style>
