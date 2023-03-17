import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation ($data: CreateUserInput!) {
    signUp(data: $data) {
      token
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation ($input: SignInInput!) {
    signIn(data: $input) {
      token
    }
  }
`;
