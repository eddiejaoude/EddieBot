import { CacheModule, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenCacheService } from './token-cache.service';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule, CacheModule.register()],
      providers: [TokenService, TokenCacheService],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
