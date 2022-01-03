import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getRepository } from 'typeorm';
import { GuildConfiguration } from '../../typeorm/entities/GuildConfiguration';

export default class ChprefixCommand extends BaseCommand {
  constructor(
    private readonly guildConfigRepository = getRepository(GuildConfiguration)
  ) {
    super('chprefix', 'mod', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args.length) {
      message.channel.send('Please provide an argument!');
      return;
    }
    const [newPrefix] = args;
    try {
      const config = client.configs.get(message.guildId!);
      const updatedConfig = await this.guildConfigRepository.save({
        ...config,
        prefix: newPrefix,
      });
      console.log(updatedConfig);
      message.channel.send('Updated prefix successfully!');
      client.configs.set(message.guildId!, updatedConfig);
      console.log(client.configs);
    } catch (err) {
      console.log(err);
      message.channel.send('Something went wrong.');
    }
  }
}
