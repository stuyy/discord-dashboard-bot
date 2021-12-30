require('dotenv').config();
import { registerCommands, registerEvents } from './utils/registry';
import config from '../slappey.json';
import DiscordClient from './client/client';
import { Intents } from 'discord.js';
const client = new DiscordClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

(async () => {
  client.prefix = config.prefix || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DJS_BOT_TOKEN);
})();
