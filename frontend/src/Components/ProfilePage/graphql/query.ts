import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query {
    users {
      id
      firstname
      lastname
      inWorks {
        project {
          id
        }
      }
      avatar {
        link
      }
    }
  }
`;

export const GET_COMPANIES_QUERY = gql`
  query {
    companies {
      name
      id
    }
  }
`;

export const GET_PROJECTS_QUERY = gql`
  query {
    projects {
      name
      id
    }
  }
`;
