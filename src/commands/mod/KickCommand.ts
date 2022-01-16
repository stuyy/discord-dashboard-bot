import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getRepository, Repository } from 'typeorm';
import { ModerationLog } from '../../typeorm/entities/ModerationLog';

export default class KickCommand extends BaseCommand {
  constructor(
    private readonly modLogRepository: Repository<ModerationLog> = getRepository(
      ModerationLog
    )
  ) {
    super('kick', 'mod', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    console.log(args);
    const [memberId, ...rest] = args;
    const reason = rest.join(' ');
    try {
      // const member = await message.guild?.members.fetch(memberId)!;
      // await member.kick(reason);
      const date = new Date();
      date.setDate(date.getDate() - 6);
      const modLog = this.modLogRepository.create({
        guildId: message.guildId!,
        memberId,
        issuedBy: message.author.id,
        issuedOn: date,
        reason,
        type: 'kick',
      });
      await this.modLogRepository.save(modLog);
    } catch (err) {
      console.log(err);
    }
  }
}
