import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('Test command works');
  }
}