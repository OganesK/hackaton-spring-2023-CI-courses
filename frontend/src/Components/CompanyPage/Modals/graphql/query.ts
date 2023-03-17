import { gql } from '@apollo/client';

export const GET_CONTACTS_QUERY = gql`
  query ($id: Int) {
    contact(where: { id: $id }) {
      id
      emails
      adresses
      phones
      ownerCompany {
        id
      }
    }
  }
`;
