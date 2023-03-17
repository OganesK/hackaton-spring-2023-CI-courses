import { gql } from '@apollo/client';

export const GET_COMPANY_QUERY = gql`
  query ($companyId: Int) {
    company(where: { id: $companyId }) {
      id
      name
      avatar {
        link
      }
      shortDescription
      description
      activityKind
      inn
      mainRegion
      mainContact
    }
  }
`;
