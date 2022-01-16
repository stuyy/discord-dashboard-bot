import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getRepository, Repository } from 'typeorm';
import { ModerationLog } from '../../typeorm/entities/ModerationLog';

export default class TimeoutCommand extends BaseCommand {
  constructor(
    private readonly modLogRepository: Repository<ModerationLog> = getRepository(
      ModerationLog
    )
  ) {
    super('timeout', 'mod', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    console.log(args);
    const [memberId, timeoutStr, ...rest] = args;
    const reason = rest.join(' ');
    const time = parseInt(timeoutStr);
    if (isNaN(time)) {
      message.channel.send('Invalid Time');
      return;
    }
    try {
      const member = await message.guild?.members.fetch(memberId)!;
      await member.timeout(time * 1000, reason);
      const modLog = this.modLogRepository.create({
        guildId: message.guildId!,
        memberId,
        issuedBy: message.author.id,
        issuedOn: new Date(),
        reason,
        type: 'timeout',
      });
      await this.modLogRepository.save(modLog);
    } catch (err) {
      console.log(err);
    }
  }
}
