import { gql } from '@apollo/client';

export const GET_ALL_NON_VERIFICATED_POSTS_QUERY = gql`
  query {
    getAllNonVerificatedPosts {
      id
      poster {
        link
      }
      title
      description
      article {
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
      project {
        name
      }
      createdAt
      isNews
      isOffer
      isResource
    }
  }
`;

export const GET_ALL_NON_VERIFICATED_PROJECTS_QUERY = gql`
  query {
    getAllNonVerificatedProjects {
      id
      name
      shortDescription
      poster {
        link
      }
      presentationMedia {
        link
      }
      description {
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
      ownerCompany {
        name
      }
      createdAt
      category
    }
  }
`;

export const GET_ALL_NON_VERIFICATED_COMPANIES_QUERY = gql`
  query {
    getAllNonVerificatedCompanies {
      id
      name
      avatar {
        link
      }
      shortDescription
      description
      owner {
        firstname
        lastname
      }
      createdAt
      activityKind
    }
  }
`;

export const GET_ALL_NON_VERIFICATED_EVENTS_QUERY = gql`
  query {
    getAllNonVerificatedEvents {
      id
      name
      poster {
        link
      }
      category
      shortDescription
      description
      date
      organizer
      user {
        firstname
        lastname
      }
      address
      theme
      format
    }
  }
`;

export const GET_ALL_NON_VERIFICATED_CONTACTS_QUERY = gql`
  query {
    getAllNonVerificatedContacts {
      id
      ownerCompany {
        name
        avatar {
          link
        }
        id
      }
      phones
      adresses
      emails
    }
  }
`;

export const GET_ALL_NON_VERIFICATED_CROWDS_QUERY = gql`
  query {
    getAllNonVerificatedCrowdFunding {
      id
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
      poster {
        link
      }
      project {
        name
      }
      start
      end
      goalSum
      nowSum
      tariffs {
        id
        createdAt
        title
        price
        description
      }
      createdAt
    }
  }
`;

export const GET_ALL_UPDATED_POSTS = gql`
  query {
    getAllPostUpdatedVariables {
      id
      post {
        title
        description
        poster {
          link
        }
        articleBody
        createdAt
        isNews
        isOffer
        isResource
        project {
          name
        }
      }
      title
      description
      poster {
        link
      }
      articleBody
      createdAt
    }
  }
`;

export const GET_ALL_UPDATED_PROJECTS = gql`
  query {
    getAllProjectUpdatedVariables {
      id
      project {
        name
        shortDescription
        description {
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
        poster {
          link
        }
        presentationMedia {
          link
        }
        ownerCompany {
          name
        }
        createdAt
        category
      }
      name
      shortDescription
      description
      poster {
        link
      }
      presentationMedia {
        link
      }
      createdAt
      category
    }
  }
`;

export const GET_ALL_UPDATED_COMPANIES = gql`
  query {
    getAllCompanyUpdatedVariables {
      id
      company {
        name
        shortDescription
        description
        owner {
          firstname
          lastname
        }
        createdAt
        avatar {
          link
        }
      }
      name
      shortDescription
      description
      createdAt
      avatar {
        link
      }
    }
  }
`;

export const GET_ALL_UPDATED_EVENTS = gql`
  query {
    getAllEventUpdatedVariables {
      id
      name
      shortDescription
      description
      date
      poster {
        link
      }
      event {
        id
        name
        shortDescription
        description
        date
        poster {
          link
        }
        organizer {
          name
        }
      }
    }
  }
`;

export const GET_ALL_UPDATED_CONTACTS = gql`
  query {
    getAllContactUpdatedVariables {
      id
      phones
      emails
      adresses
      contact {
        phones
        emails
        adresses
        ownerCompany {
          name
        }
      }
    }
  }
`;
