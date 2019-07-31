import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { CallModule } from '../call/call.module';
import { CallService } from '../call/call.service';
import { DbService } from '../db/db.service';

@Module({
  imports: [CallModule],
  providers: [GameService, CallService, DbService],
  controllers: [GameController],
})
export class GameModule {}
