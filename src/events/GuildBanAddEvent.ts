// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanAdd
import { GuildBan } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';

export default class GuildBanAddEvent extends BaseEvent {
  constructor() {
    super('guildBanAdd');
  }

  async run(client: DiscordClient, ban: GuildBan) {
    console.log(`Banned User ${ban.user.tag}`);
    client.socket.emit('guildBanAdd', ban.user);
  }
}
