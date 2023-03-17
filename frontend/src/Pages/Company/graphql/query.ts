import { gql } from '@apollo/client';

export const GET_COMPANY_QUERY = gql`
  query ($companyId: Int) {
    company(where: { id: $companyId }) {
      name
      avatar {
        link
      }
      description
      inn
      mainRegion
      mainContact
      activityKind
      createdAt
      owner {
        id
        firstname
        lastname
      }
      contact {
        id
        emails
        phones
        adresses
        isApproved
      }
      projects {
        id
        name
        poster {
          link
        }
        description {
          id
          sections {
            text
            media {
              link
            }
          }
        }
        shortDescription
        category
        isApproved
        presentationMedia {
          link
          type
        }
      }
    }
  }
`;
