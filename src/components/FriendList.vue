<template>
  <div class="friend-list">
    <div
      is="friend-list-item"
      v-for="friend of friends"
      :key="friend.key"
      :avatar="friend.avatar"
      :name="friend.name"
      :lastMessage="friend.lastMessage"
    ></div>
  </div>
</template>

<script>

import FriendListItem from '@/components/FriendListItem'

export default {
  name: 'friend-list',
  components: { FriendListItem },
  data () {
    const friends = this.$store.state.friends
    return { friends }
  }
}

</script>

<style scoped>
.friend-list {
  display: block;
  width: 250px;
  height: 100%;
  background: linear-gradient(141deg, #0c384c 0%, #314460 75%);
  float: left;
  overflow-y: scroll;
  border-radius: 0 0 0 3px;
  -ms-user-select: none;
  user-select: none;
}

.friend-list::-webkit-scrollbar {
  display: none;
}
</style>
