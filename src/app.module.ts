import { Module } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { DbModule } from './modules/db/db.module';
import { CallModule } from './modules/call/call.module';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [GameModule, DbModule, CallModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
