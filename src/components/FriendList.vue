<template>
  <div class="friend-list">
    <div class="new-chat">
      <div class="add-one-one" @click="newChat">+</div>
      <div class="name-input">
        <input v-model="friendUuid" type="text" placeholder="Friend's ID...">
      </div>
    </div>
    <friend-list-item
      v-for="(friend, index) of friends"
      :key="index"
      :index="index"
      :name="friend.name"
      :lastMessage="friend.lastMessage"
      :avatar="friend.avatar"
    ></friend-list-item>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import util from '../util';
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

      // Make a new chat key using the friend and client's ID.
      let uuids = [this.friendUuid, this.$store.state.me.uuid].sort();
      let chatKey = uuids.join('-');

      // Don't make the same 1:1 chat if it already exists
      if (this.$store.state.chats[chatKey]) {
        this.friendUuid = '';
        return;
      }

      // Make the new 1:1 private Chat (can be set to a variable for invite use)
      const newOneToOneChat = util.newChatEngineChat(
        this.$store,
        this.$chatEngine,
        {
          chatKey,
          uuid: this.friendUuid,
        },
        true,
      );

      // Automatically add this 1:1 chat to the other user's Client and UI
      // Be sure to set variable `newOneToOneChat` above
      // More invite code in (main.js)
      if (
        this.friendUuid &&
        newOneToOneChat &&
        newOneToOneChat.chatEngine.users[this.friendUuid]
      ) {
        const user = newOneToOneChat.chatEngine.users[this.friendUuid];
        newOneToOneChat.invite(user);
      }

      // Clear the text input for adding a friend
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
