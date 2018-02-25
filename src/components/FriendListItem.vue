<template>
  <div class="friend-list-item">
    <img :src="avatar" />
    <div class="text">
      <span class="name">{{ name }}</span>
      <span class="lastMessage">{{ lastMessage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'friend-list-item',
  props: ['avatar', 'name', 'lastMessage'],
  data () {
    return {}
  }
}
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
