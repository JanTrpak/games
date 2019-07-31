import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { DbModule } from '../db/db.module';
import { DbService } from '../db/db.service';
import { ConfigModule } from '../config/config.module'

@Module({
    imports: [DbModule, ConfigModule],
    providers: [CallService, DbService],
    controllers: [CallController],
})
export class CallModule { }
