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

export const GET_PROJECT_QUERY = gql`
  query ($id: Int!) {
    project(where: { id: $id }) {
      id
      name
      shortDescription
      poster {
        link
      }
      category
      industrialDirections
      projectType
      projectStage
      projectSite
      projectMarket
      technologyType
      investmentStage
      businessModel
      salesType
      mainGoal
    }
  }
`;
