import { gql } from '@apollo/client';

export const GET_CROWDFUNDING_QUERY = gql`
  query ($id: Int!) {
    crowdFunding(where: { id: $id }) {
      id
      createdAt
      title
      shortDescription
      poster {
        link
      }
      start
      end
      goalSum
      nowSum
      isApproved
      activeCheck
    }
  }
`;

export const GET_TARIFF_QUERY = gql`
  query ($id: Int!) {
    crowdFunding(where: { id: $id }) {
      id
      tariffs {
        id
        title
        price
        buyerCount
        description
      }
    }
  }
`;
