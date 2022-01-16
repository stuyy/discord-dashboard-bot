require('dotenv').config();
import 'reflect-metadata';
import { registerCommands, registerEvents } from './utils/registry';
import DiscordClient from './client/client';
import { Collection, Intents } from 'discord.js';
import { createConnection, getRepository } from 'typeorm';
import { GuildConfiguration } from './typeorm/entities/GuildConfiguration';
import { io } from 'socket.io-client';
import { entities } from './typeorm/entities';

const client = new DiscordClient({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

(async () => {
  const socket = io('http://localhost:3001');

  socket.on('guildPrefixUpdate', (config: GuildConfiguration) => {
    console.log('guildPrefixUpdate');
    console.log(config);
    console.log(client.configs);
    client.configs.set(config.guildId, config);
    console.log(client.configs);
  });

  await createConnection({
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: 3306,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
    synchronize: true,
    entities: entities,
  });

  const configRepo = getRepository(GuildConfiguration);
  const guildConfigs = await configRepo.find();
  const configs = new Collection<string, GuildConfiguration>();
  guildConfigs.forEach((config) => configs.set(config.guildId, config));

  client.configs = configs;
  client.socket = socket;

  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DJS_BOT_TOKEN);
})();
