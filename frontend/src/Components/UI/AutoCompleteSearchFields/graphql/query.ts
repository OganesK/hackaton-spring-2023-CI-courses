import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query ($id: Int) {
    user(where: { id: $id }) {
      ownerCompanies {
        id
        name
      }
    }
  }
`;
