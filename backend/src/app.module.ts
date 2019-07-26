import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './components/user';
import { AuthModule } from './components/auth/auth.module';
import { join } from 'path';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

const errorFormatter = (error: GraphQLError): GraphQLFormattedError => {
	return {
		message: error.message
	};
};

@Module({
	imports: [
		UserModule,
		AuthModule,
		TypeOrmModule.forRoot(),
		GraphQLModule.forRoot({
			playground: true,
			autoSchemaFile: 'schema.graphql',
			definitions: {
				path: join(process.cwd(), '../webapp/src/graphql.ts'),
				outputAs: 'interface'
			},
			formatError: errorFormatter
		})
	]
})
export class AppModule {
x
	constructor() {
	}
}
