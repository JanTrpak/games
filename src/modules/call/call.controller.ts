import { Controller, Get, UseGuards } from '@nestjs/common';
import { CallService } from './call.service';
import { Authorization } from './authorization'
import { ICall } from './interfaces/call.interface'

@Controller('calls')
@UseGuards(Authorization)
export class CallController {

    constructor(
        private readonly callService: CallService,
    ) { }

    @Get('/')
    async getMondayCallsInfo(): Promise<ICall[]> {
        try {
            const mondayRows = await this.callService.getMondayCallRows();
            return mondayRows;
        } catch (e) {
            throw Error(e);
        }
    }
}