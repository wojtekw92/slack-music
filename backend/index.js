
const models = require('./models');
const express = require('express');
const helpers = require('./helpers')
const webToken = process.env.WEB_TOKEN;

if (!global.WebSocket) {
  global.WebSocket = require('ws');
}
const wsClient= require('mattermost-redux/client/websocket_client').default

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


var re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const youtube = /youtu(be|.be)?(\.com)?/gm
const soundCloud = /soundcloud\.com/gm
const spotify = /spotify\.com/gm


wsClient.setEventCallback(function(msg) {
  if(msg.event === "hello") {
    console.log(msg);
  }
  if(msg.event === "posted" ) {
    const post_data = JSON.parse(msg.data.post);
    const links = post_data.message.match(re);
    if (!links) {
      return;
    }
    if (links) {
      console.log(JSON.stringify({
        user: {
          id: post_data.user_id,
          name: msg.data.sender_name,
        },
        channel: {
          id: post_data.channel_id,
          name: msg.data.channel_name,
        },
        timestamp: post_data.create_at,
        links: links
      }));
    }
    links.forEach(async element => {
      if (!(element.match(youtube) || element.match(spotify) || element.match(soundCloud))) return;
      const ogData = await helpers.ogsPromise(element);
      await models.Links.create({
        channelName: msg.data.channel_name,
        userName: msg.data.sender_name,
        link: element,
        userId: post_data.user_id,
        channelId: post_data.channel_id,
        ogImage: ogData.ogImage ? ogData.ogImage.url : '',
        ogTitle: ogData.ogTitle,
        ogDescription: ogData.ogDescription,
      });
    });
  }
});

wsClient.initialize(webToken,  {connectionUrl: 'wss://mattermost.jelocartel.com/api/v4/websocket'});
