// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanRemove
import { GuildBan } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';

export default class GuildBanRemoveEvent extends BaseEvent {
  constructor() {
    super('guildBanRemove');
  }

  async run(client: DiscordClient, ban: GuildBan) {
    console.log(`Unbanned User ${ban.user.tag}`);
    client.socket.emit('guildBanRemove', ban.user);
  }
}
