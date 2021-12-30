
import { Message } from 'discord.js';
import DiscordClient from '../../client/client';

export default abstract class BaseCommand {
  constructor(private name: string, private category: string, private aliases: Array<string>) {}

  getName(): string { return this.name; }
  getCategory(): string { return this.category; }
  getAliases(): Array<string> { return this.aliases; }

  abstract run(client: DiscordClient, message: Message, args: Array<string> | null): Promise<void>;
}