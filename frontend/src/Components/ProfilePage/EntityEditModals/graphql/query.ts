import { gql } from '@apollo/client';

export const GET_EVENT_DATA = gql`
  query ($id: Int!) {
    event(where: { id: $id }) {
      id
      name
      poster {
        link
      }
      category
      description
      shortDescription
      date
      address
      format
      theme
      organizer
      
    }
  }
`;

export const GET_POST_QUERY = gql`
  query ($id: Int!) {
    post(where: { id: $id }) {
      id
      createdAt
      title
      isOffer
      isResource
      isNews
      category
      poster {
        link
      }
      description
      
    }
  }
`;

export const GET_PROFILE_QUERY = gql`
  query ($id: Int) {
    user(where: { id: $id }) {
      id
      firstname
      lastname
      avatar {
        link
      }
      shortDescription
      bio
      city
    }
  }
`;
