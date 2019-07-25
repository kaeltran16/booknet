import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'thisisaverylongandcomplexpassword'
		}),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		forwardRef(() => UserModule)
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule {
}
