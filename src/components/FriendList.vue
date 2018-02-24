<template>
  <div class="friend-list">
    <friend-list-item></friend-list-item>
    <friend-list-item></friend-list-item>
  </div>
</template>

<script>

import FriendListItem from '@/components/FriendListItem'

export default {
  name: 'friend-list',
  components: { FriendListItem },
  data () {
    return {}
  }
}

</script>

<style scoped>
.friend-list {
  display: block;
  width: 250px;
  height: 100%;
  background-color: #314460;
  float: left;
  overflow-y: scroll;
  border-radius: 0 0 0 3px;
}

.friend-list::-webkit-scrollbar {
  display: none;
}
</style>
