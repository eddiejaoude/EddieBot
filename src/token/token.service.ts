import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'discord.js';
import { TokenResponse } from './interfaces/token.interface';
import { TokenCacheService } from './token-cache.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenCacheService: TokenCacheService,
    private readonly config: ConfigService,
  ) {}

  public async createToken(message: Message) {
    const serverId = message.guild.id;
    const token = await this.tokenCacheService.getNewToken(serverId, [
      'Data.Read',
    ]);

    return token as TokenResponse;
  }
}
