import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query {
    users {
      id
      firstname
      lastname
      
      avatar {
        link
      }
    }
  }
`;
