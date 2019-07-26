
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface LoginInput {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export interface IMutation {
    register(input: RegisterInput): UserEntity | Promise<UserEntity>;
    login(input: LoginInput): string | Promise<string>;
}

export interface IQuery {
    user(email: string): UserEntity | Promise<UserEntity>;
}

export interface UserEntity {
    id: string;
    name: string;
    email: string;
}
