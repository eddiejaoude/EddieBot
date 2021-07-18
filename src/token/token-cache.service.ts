import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { TokenResponse } from './interfaces/token.interface';

@Injectable()
export class TokenCacheService {
  private url = `${this.config.get('API_URL')}/auth`;
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  public async getNewToken(
    serverId: string,
    scopes: string[],
  ): Promise<TokenResponse> {
    const response = await this.http
      .post(
        this.url,
        {
          scopes: scopes,
          serverId,
        },
        { headers: { 'Client-Token': this.config.get('API_TOKEN') } },
      )
      .toPromise();

    const payload = response.data as TokenResponse;

    return payload;
  }

  private async cacheToken(token: TokenResponse): Promise<void> {
    const cacheKey = this.prepareCacheKey(token.keyspace);
    await this.cacheManager.set(cacheKey, token.accessToken, {
      ttl: token.expiresIn,
    });
  }

  private prepareCacheKey(serverId: string) {
    return `token-${serverId}`;
  }

  public async returnToken(serverId: string): Promise<string> {
    const cacheKey = this.prepareCacheKey(serverId);

    let accessToken: string = await this.cacheManager.get(cacheKey);

    try {
      if (!accessToken) {
        throw new Error("AccessToken couldn't be retrieved from Cache");
      }
    } catch (e) {
      const response = await this.getNewToken(serverId, [
        'Data.Read',
        'Data.Write',
      ]);
      await this.cacheToken(response);
      accessToken = response.accessToken;
    }
    return accessToken;
  }
}
