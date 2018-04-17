<template>
  <div class="friend-list">
    <friend-list-item
      v-for="friend of friends"
      :key="friend.id"
      :name="friend.name"
      :lastMessage="friend.lastMessage"
      :avatar="friend.avatar"
      :chatKey="friend.chatKey"
    ></friend-list-item>
    <div class="add-one-one vertical-align" @click="newChat">+</div>
  </div>
</template>

<script>
import FriendListItem from '@/components/FriendListItem';

export default {
  name: 'friend-list',
  components: {
    FriendListItem,
  },
  data() {
    const friends = this.$store.state.friends;
    return {
      friends,
    };
  },
  methods: {
    newChat(e) {
      console.log('newChat', e);
    },
  },
};

</script>

<style scoped>
.friend-list {
  -ms-user-select: none;
  user-select: none;
  position: relative;
  display: block;
  width: 250px;
  height: 100%;
  background: linear-gradient(141deg, #0c384c 0%, #314460 75%);
  float: left;
  overflow-y: scroll;
  border-radius: 0 0 0 3px;
}

.friend-list::-webkit-scrollbar {
  display: none;
}

.add-one-one {
  -ms-user-select: none;
  user-select: none;
  position: absolute;
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 8px;
  border-radius: 50%;
  bottom: 0;
  left: 0;
  line-height: 40px;
  font-family: Arial;
  font-size: 24px;
  color: #FFFFFF;
  background-color: #0C9EBD;
  cursor: pointer;
}
</style>
