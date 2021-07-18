import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from 'discord-nestjs';
import { AppService } from './app.service';
import { DiscordConfigService } from './environment/discord-config.service';
import { AlexModule } from './alexjs/alex.module';
import { VersionModule } from './version/version.module';
import { CheckImageModule } from './check-image/check-image.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    AlexModule,
    DiscordModule.forRootAsync({ useClass: DiscordConfigService }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VersionModule,
    CheckImageModule,
    TokenModule,
  ],
  providers: [AppService, DiscordConfigService],
})
export class AppModule {}
