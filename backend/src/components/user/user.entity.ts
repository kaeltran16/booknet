import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
@Entity('user')
export class UserEntity extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column()
	name: string;

	@Column('text')
	password: string;

	@Field()
	@IsEmail()
	@Column({ unique: true })
	email: string;

}
