import logger from './Logger.js';
import Remote from './channels/Remote.js';
import Console from './channels/Console.js';
import Channels from './Channels.js';
import Bots from './bot/Bots.js'
import Hub from './bot/Hub.js';
import loader from './bot/Loader.js';
import config from './Config.js';

(async () => {
  new Hub({
    channels: new Channels([
      new Remote(config.channels.remote.url),
      new Console()
    ]),
    bots: new Bots(await loader())
  }).listen();
})();


/*
  startup commands


  ~ttt 1 1 x just instantly wins (puts an x 3 times in the whole column)

  use file logger
  handle all todos

  Set appPath globally in app.js (but Config.js depends on it being set before then?)

  separate stream for errors and content?

  better error handling for config.json, and enforce structure.

  better folder structure

  ChatBot:
    Store enabled state of each bot persistently.

  Finish UdpBot, and test it. It currently is not sending to the Chat.

  Bots:
    tic-tac-toe
    client stats - requires code merge of ChatBot & Chat
    chat stats
    dump src code (i.e. file browser)
    todos bot

  Chat:
    Backup & Restore maybe the last 100 messages.
    WIP - need to test read & write to file first! Currently disabled.

    Integrate self testing into app. I.e. have a bot that sends all test messages into the chat.

  would be nice, but doesn't need doing:
    trusted access to e.g. context.onNewMessage


*/