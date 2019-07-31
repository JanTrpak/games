import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class DbService {
    constructor() { }
    knex = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: "./epic.db"
        },
        useNullAsDefault: true
    });

    public async createDbInput(tableName: string, input: object) {
        await this.knex(tableName).insert(input)
            .catch(e => { throw new Error('Error: Cant create input'); })
    }

    public async getDbRows(tableName: string) {
        const rows = await this.knex(tableName)
            .catch(e => { throw new Error('Error: Cant read data from selected table'); });
        return rows;
    }
}