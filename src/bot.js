import ChatEngineCore from 'chat-engine';
import typingIndicator from 'chat-engine-typing-indicator';
import util from './util';

export default (ChatEngineHumanClient, bot, chatBotURL) => {
  // Create a ChatEngine instance for the ChatBot to correspond from
  // by using the same connection info as the human's ChatEngine client
  const ChatEngineBotClient = ChatEngineCore.create({
    publishKey: ChatEngineHumanClient.pnConfig.publishKey,
    subscribeKey: ChatEngineHumanClient.pnConfig.subscribeKey,
  }, {
    globalChannel: ChatEngineHumanClient.global.channel,
  });

  // Connect the ChatBot's Client
  ChatEngineBotClient.connect(bot.uuid, {
    name: bot.name,
    uuid: bot.uuid,
  });

  ChatEngineBotClient.on('$.ready', function(data) {
    // Make a ChatEngine Chat object of the ChatBot
    let botChat = new ChatEngineBotClient.Chat(bot.chatKey, true);

    // Add the Typing Indicator ChatEngine plugin to this 1:1 chat
    botChat.plugin(typingIndicator({
        timeout: 2000,
    }));

    botChat.on('$.connected', () => {
      botChat.on('message', (payload) => {
        // When the human sends the ChatBot a message,
        // generate a reply by passing the message to Amazon Lex
        if (payload.sender.uuid !== bot.uuid) {
          botChat.typingIndicator.startTyping();

          // Make a request to PubNub Functions which contacts Lex API
          util.post(chatBotURL, {
            body: {
              data: {
                lex: {
                  botAlias: 'StephenChatEngineExample',
                  botName: 'StephenChatEngineExample',
                  contentType: 'text/plain; charset=utf-8',
                  inputText: payload.data.text,
                  userId: 'ChatEngineVueDemo',
                },
              },
            },
          }).then((res) => {
            botChat.typingIndicator.stopTyping();

            // ChatEngine publish the ChatBot's reply made by Lex
            botChat.emit('message', {
              text: res.lex_text,
            });
          });
        }
      });
    });
  });
};
