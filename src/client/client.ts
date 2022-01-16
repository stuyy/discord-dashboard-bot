import { Client, ClientOptions, Collection } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import BaseCommand from '../utils/structures/BaseCommand';
import { GuildConfiguration } from '../typeorm/entities/GuildConfiguration';
import { Socket } from 'socket.io-client';

export default class DiscordClient extends Client {
  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string = '!';
  private _configs = new Collection<string, GuildConfiguration>();
  private _socket: Socket;

  constructor(options: ClientOptions) {
    super(options);
  }

  get commands(): Collection<string, BaseCommand> {
    return this._commands;
  }
  get events(): Collection<string, BaseEvent> {
    return this._events;
  }
  get prefix(): string {
    return this._prefix;
  }
  set prefix(prefix: string) {
    this._prefix = prefix;
  }
  get configs() {
    return this._configs;
  }
  set configs(guildConfigs: Collection<string, GuildConfiguration>) {
    this._configs = guildConfigs;
  }

  set socket(socket: Socket) {
    this._socket = socket;
  }

  get socket() {
    return this._socket;
  }
}
