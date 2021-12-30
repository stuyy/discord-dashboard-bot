require('dotenv').config();
import 'reflect-metadata';
import { registerCommands, registerEvents } from './utils/registry';
import config from '../slappey.json';
import DiscordClient from './client/client';
import { Intents } from 'discord.js';
import { createConnection } from 'typeorm';
const client = new DiscordClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

(async () => {
  client.prefix = config.prefix || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DJS_BOT_TOKEN);
  await createConnection({
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: 3306,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
  });
})();
