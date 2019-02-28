const { RTMClient, WebClient } = require('@slack/client');
const models = require('./models');

const token = process.env.SLACK_TOKEN;

var re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

const web = new WebClient(token);
const rtm = new RTMClient(token);
rtm.start();

rtm.on('message', async (message) => {
  if ( (message.subtype && message.subtype === 'bot_message') ||
    (!message.subtype && message.user === rtm.activeUserId) ) {
    return;
  }

  if (!message.text) { 
    return;
  }

  const links = message.text.match(re);
  if (!links) {
    return;
  }

  let channels = await web.conversations.list({
    types: "public_channel,private_channel",
  });
  let users = await web.users.list();
  
  const channel = channels.channels.find(c => (c.id === message.channel));
  const user = users.members.find(u => (u.id === message.user));
  
  links.forEach(async element => {
    await models.Links.create({
      channelName: channel.name,
      userName: user.name,
      link: element
    });
  });
  
  
  if (links) {
    console.log(JSON.stringify({
      user: {
        id: message.user,
        name: user.name,
      },
      channel: {
        id: message.channel,
        name: channel.name,
      },
      links: links
    }));
  }
});

