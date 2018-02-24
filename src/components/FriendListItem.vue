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
  data () {
    return {
      avatar: 'https://lh3.googleusercontent.com/-nr6r2jf30wY/AAAAAAAAAAI/AAAAAAAAAio/mthZ3J53MWI/s120-p-rw-no/photo.jpg',
      name: 'Adam Bavosa',
      lastMessage: "No I can't come to your party tomorrow. I really don't like you so why should I be near you ever?"
    }
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
