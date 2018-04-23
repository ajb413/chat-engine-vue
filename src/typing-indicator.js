import typingIndicator from 'chat-engine-typing-indicator';
import {EventBus} from './event-bus.js';

export default (chat) => {
  chat.plugin(typingIndicator({
    timeout: 2000, // Time after final keyup until stopTyping fires
  }));

  chat.on('$typingIndicator.startTyping', (event) => {
    const chat = event.chat;
    const me = event.sender.name === 'Me' ? true : false;

    // Only fire the UI changing event if the sender is not me.
    if (!me) {
      // Handler in Chat Log Component (components/ChatLog.vue)
      EventBus.$emit('typing-start', chat.key);
    }
  });

  chat.on('$typingIndicator.stopTyping', (event) => {
    const chat = event.chat;
    const me = event.sender.name === 'Me' ? true : false;

    // Only fire the UI changing event if the sender is not me.
    if (!me) {
      // Handler in Chat Log Component (components/ChatLog.vue)
      EventBus.$emit('typing-stop', chat.key);
    }
  });
};
