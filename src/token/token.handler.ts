import { Injectable } from '@nestjs/common';
import { OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';
import { TokenResponse } from './interfaces/token.interface';
import { TokenService } from './token.service';
import config from '../config';

const { defaultEmbed, colors } = config;

@Injectable()
export class TokenHandler {
  constructor(private readonly tokenService: TokenService) {}

  @OnCommand({ name: 'create-token' })
  async createToken(message: Message) {
    if (message.member.roles.cache.some((role) => role.name === 'Moderators')) {
      const token: TokenResponse = await this.tokenService.createToken(message);
      const embed = defaultEmbed(config.colors.message)
        .setTitle('New Token created')
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription('A new Token to access to API was created successfully')
        .addField('AccessToken: ', `\`${token.accessToken}\``)
        .addField('Client-ID: ', `\`${token.clientId}\``);
      const sentMessage = await message.channel.send(embed);
      sentMessage.delete({ timeout: 180000 });
    } else {
      await message.reply('You are not authorized to do that');
    }
  }
}
