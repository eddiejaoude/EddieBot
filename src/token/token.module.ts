import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { TokenHandler } from './token.handler';
import { TokenService } from './token.service';
import { TokenCacheService } from './token-cache.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [TokenHandler, TokenService, TokenCacheService],
  exports: [TokenCacheService],
})
export class TokenModule {}
