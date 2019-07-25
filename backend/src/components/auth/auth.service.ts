import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../user';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { Credentials } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(@Inject(forwardRef(() => UserService)) private userService: UserService,
							private readonly jwtService: JwtService) {
	}

	async createToken(credentials: Credentials): Promise<string> {
		const user = await this.userService.login(credentials);
		return this.jwtService.sign({ email: user.email, name: user.name }, {
			expiresIn: credentials.remember ? '7 days' : '1h'
		});
	}

	async validateUser(payload: JwtPayload): Promise<UserEntity> {
		return await this.userService.findByEmail(payload.email);
	}

	async verifyToken(token: string) {
		return await this.jwtService.verifyAsync(token);
	}
}
