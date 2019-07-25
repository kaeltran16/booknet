// import { Logger } from 'winston';
// import { QueryRunner } from 'typeorm';
// import { AppLogger } from './app.logger';
//
// export class AppQueryLogger extends AppLogger implements Logger {
// 	constructor() {
// 		super('TypeOrm');
// 	}
// 	logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
// 		super.log(query);
// 	}
//
// 	logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
// 		super.log(query);
// 	}
//
// 	logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
// 		super.log(query);
// 	}
//
// 	logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
// 		super.log(message);
// 	}
//
// 	logMigration(message: string, queryRunner?: QueryRunner): any {
// 		super.log(message);
// 	}
//
// 	log(level: any, message?: any, queryRunner?: QueryRunner): any {
// 		super.log(message);
// 	}
// }
