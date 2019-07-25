import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET || 'thisisaverylongsecret',
			passReqToCallback: true
		});
	}

	async validate(request, payload: JwtPayload, done: Function) {
		const user = await this.authService.validateUser(payload);
		if (!user) {
			return done(new UnauthorizedException(), false);
		}
		request.user = user;
		done(null, user);
	}
}
