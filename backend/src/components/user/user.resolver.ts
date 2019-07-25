import { UserEntity } from './user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterInput } from './register.input';
import { UserService } from './user.service';
import { BadRequestException, forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginInput } from './login.input';

@Resolver(UserEntity)
export class UserResolver {
	constructor(private userService: UserService, @Inject(forwardRef(() => AuthService)) private authService: AuthService) {
	}

	@Query(() => UserEntity)
	async user(@Args('email') email: string): Promise<UserEntity> {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new NotFoundException('user not found');
		return user;
	}

	@Mutation(() => UserEntity)
	async register(@Args('input')
									 {
										 name,
										 email,
										 password
									 }: RegisterInput): Promise<UserEntity> {
		const user = await this.userService.findByEmail(email);
		if (user) throw new BadRequestException('user with email already existed');
		return this.userService.register({ email, name, password });
	}

	@Mutation(() => String)
	async login(@Args('input'){ email, password, remember }: LoginInput): Promise<string> {
		return this.authService.createToken({ email, password, remember });
	}


}
