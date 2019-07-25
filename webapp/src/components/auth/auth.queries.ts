import { gql } from 'apollo-boost';

export const LOGIN = gql`
    mutation($input: LoginInput!) {
        login(input: $input)
    }
`;


export const REGISTER = gql`
    mutation ($input: RegisterInput!) {
        register(input: $input) {
            id,
            email,
            name
        }
    }
`;

export const USER = gql`
    query ($email: String!) {
        user(email: $email) {
            id,
            email,
            name
        }
    }
`;

export const CHECK_EMAIL_EXIST = gql`
    query ($email: String!) {
        user(email: $email) {
            email
        }
    }
`;

