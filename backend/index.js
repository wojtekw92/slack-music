const { RTMClient, WebClient } = require('@slack/client');
const models = require('./models');
const express = require('express');
const helpers = require('./helpers')
const webToker = process.env.WEB_TOKEN;

const app = express();

const port = 8000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/api/links', async (req, res) => {
  const links = await models.Links.findAll();
  res.send(links);
});

app.listen(port, () => {
  console.log('We are live on ' + port);
});

const token = process.env.SLACK_TOKEN;

var re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const youtube = /youtu(be|.be)?(\.com)?/gm
const soundCloud = /soundcloud\.com/gm
const spotify = /spotify\.com/gm

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

  links.forEach(async element => {
    if (!(element.match(youtube) || element.match(spotify) || element.match(soundCloud))) return;
    const ogData = await helpers.ogsPromise(element);
    await models.Links.create({
      channelName: channel.name,
      userName: user.name,
      link: element,
      userId: message.user,
      channelId: message.channel,
      ogImage: ogData.ogImage ? ogData.ogImage.url : '',
      ogTitle: ogData.ogTitle,
      ogDescription: ogData.ogDescription,

    });
  });
  
  

});

