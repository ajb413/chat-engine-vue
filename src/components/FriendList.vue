<template>
  <div class="friend-list">
    <div class="new-chat">
      <div class="add-one-one" @click="newChat">+</div>
      <div class="name-input">
        <input v-model="friendUuid" type="text" placeholder="Friend's ID...">
      </div>
    </div>
    <friend-list-item
      v-for="friend of friends"
      :key="friend.chatKey"
      :name="friend.name"
      :lastMessage="friend.lastMessage"
      :avatar="friend.avatar"
      :chatKey="friend.chatKey"
    ></friend-list-item>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import FriendListItem from '@/components/FriendListItem';

export default {
  name: 'friend-list',
  components: {
    FriendListItem,
  },
  data() {
    return {
      friendUuid: '',
    };
  },
  methods: {
    newChat(e) {
      if (!this.friendUuid) {
        return;
      }

      // Make a new chat key using the friend and user's UUID.
      let uuids = [this.friendUuid, this.$store.state.me.uuid].sort();
      let chatKey = uuids.join('-');
      let newOneToOneChat = new this.$chatEngine.Chat(chatKey);

      newOneToOneChat.key = chatKey;

      // Add this friend to the client's friend list
      this.$store.commit('setFriends', {
        friends: [{
          name: `Friend: ${this.friendUuid}`,
          chatKey,
        }],
      });

      // Add this chat to the global state
      this.$store.commit('newChat', {
        chat: newOneToOneChat,
      });

      this.friendUuid = '';
    },
  },
  computed: {
    ...mapGetters({
      friends: 'getFriends',
    }),
  },
};

</script>

<style scoped>
.friend-list::-webkit-scrollbar {
  display: none;
}

.friend-list {
  -ms-user-select: none;
  user-select: none;
  position: relative;
  display: block;
  width: 250px;
  height: 100%;
  background: linear-gradient(141deg, #505D74 0%, #15223A 75%);
  float: left;
  overflow-y: scroll;
  border-radius: 0 0 0 3px;
}

.new-chat {
  display: block;
  width: 100%;
  height: 28px;
  background-color: #39465B;
}

.name-input {
  display: inline-block;
  height: 100%;
  float: left;
}

.name-input input {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  height: 16px;
  width: 180px;
  outline: none;
  font-size: 12px;
  border: solid 1px #AAAAAA;
  border-radius: 3px;
  font-family: Helvetica;
}

.add-one-one {
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  float: left;
  -ms-user-select: none;
  user-select: none;
  width: 20px;
  height: 20px;
  margin: 0 6px;
  line-height: 20px;
  font-size: 20px;
  font-family: Arial;
  color: #FFFFFF;
  background-color: #15223A;
  cursor: pointer;
}
</style>
