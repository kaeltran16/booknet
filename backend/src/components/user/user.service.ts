import { Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Credentials } from '../auth';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) protected readonly repository: Repository<UserEntity>) {
	}

	async login(credentials: Credentials): Promise<UserEntity> {
		const user = await this.repository.findOne({ where: { email: credentials.email } });

		if (!user) {
			throw new NotFoundException(`user not found or password is incorrect.`);
		}

		const isValid = await bcrypt.compare(credentials.password, user.password);

		if (!isValid) {
			throw new NotFoundException(`user not found or password is incorrect.`);
		}

		return user;
	}

	async register(user: UserDto) {
		const hashedUser: UserDto = {
			...user,
			password: await bcrypt.hash(user.password, process.env.PASSWORD_SALT || 12)
		};
		return await this.repository.create(hashedUser).save();
	}

	async findByEmail(email: string) {
		return await this.repository.findOne({ where: { email } });
	}
}
