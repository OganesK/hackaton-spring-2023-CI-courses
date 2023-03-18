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

export const GET_COMPANIES_QUERY = gql`
query{
  courses{
    id
    name
    description
    poster{
      link
    }

    
  }
}
`;

