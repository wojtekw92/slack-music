const { RTMClient, WebClient } = require('@slack/client');

const token = process.env.SLACK_TOKEN;

var re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);
rtm.start();

const web = new WebClient(token);

rtm.on('message', async (message) => {
  // For structure of `message`, see https://api.slack.com/events/message
  let channels = await web.conversations.list({
    types: "public_channel,private_channel",
  });
  let users = await web.users.list();
  // Skip messages that are from a bot or my own user ID
  if ( (message.subtype && message.subtype === 'bot_message') ||
       (!message.subtype && message.user === rtm.activeUserId) ) {
    return;
  }
    if(!message.text) return;
    const channel = channels.channels.find(c => (c.id === message.channel));
    const user = users.members.find(u => (u.id === message.user));
    let pom = message.text.match(re);
    if (pom) {
        console.log(JSON.stringify({
            user: {
                id: message.user,
                name: user.name,
            },
            channel: {
                id: message.channel,
                name: channel.name,
            },
            links: pom
        }));
    }

});

