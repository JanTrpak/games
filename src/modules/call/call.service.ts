import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service'
import { ICall } from './interfaces/call.interface'
import * as moment from 'moment'



@Injectable()
export class CallService {
    constructor(
        private readonly dbService: DbService,
    ) { }

    /**
     * Returns mondays rows from call db table
     */
    public async getMondayCallRows(): Promise<ICall[]> {
        const rows: ICall[] = await this.dbService.getDbRows('call');
        const filteredRows = rows.filter(row => row.called_at && moment(row.called_at).day() === 1)
        return filteredRows;
    }

    /**
     * Add row to call db table
     */
    public async saveCallInputToDb() {
        this.dbService.createDbInput('call', { called_at: new Date().toISOString() })
    }
}
