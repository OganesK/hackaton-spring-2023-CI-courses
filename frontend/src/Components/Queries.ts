import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query {
    me {
      avatar {
        link
      }
      firstname
      lastname
      id
      ownerCompanies {
        name
        avatar {
          link
        }
        description
        projects {
          id
        }
      }
      inWorks {
        position
        project {
          name
        }
        publishedPosts {
          poster {
            link
          }
          description
          title
        }
      }
    }
  }
`;
