import { gql } from '@apollo/client';

export const GET_CROWDFUNDING_QUERY = gql`
  query {
    crowdFunding(where: { id: $id }) {
      id
      createdAt
      title
      shortDescription
      story {
        id
        sections(orderBy: { number: asc }) {
          id
          number
          type
          text
          media {
            link
          }
        }
      }
      activeCheck
    }
  }
`;

export const GET_USER_QUERY = gql`
  query ($id: Int) {
    user(where: { id: $id }) {
      firstname
      lastname
      email
    }
  }
`;
