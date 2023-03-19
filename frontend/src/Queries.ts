import { gql } from '@apollo/client';

export const GET_CONFIG_QUERY = gql`
  query {
    getPlatformConfig {
      platformTagline
      platformTitle
      platformDescription
      platformShortDescription
    }
  }
`;

export const GET_COURSES_QUERY = gql`
query{
  courses{
    id
    name
    description
    poster{
      link
    }

    
  }
}
`;

export const GET_TESTS_QUERY = gql`
query{
  tests{
    id
    name
  }
}
`;
export const GET_PROJECTS_QUERY = gql`
query{
  courses{
    id
    name
    poster{
      link
    }

    
  }
}
`;

export const GET_CROWDFUNDS_QUERY = gql`
  query {
    crowdFundings(where: { }, orderBy: { createdAt: desc }) {
      id
      title
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
      shortDescription
      goalSum
      nowSum
      project {
        id
        name
        
        poster {
          link
        }
      }
      activeCheck
    }
  }
`;

export const GET_RESOURCES_QUERY = gql`
  query {
    posts(where: {  isResource: { equals: true } }, orderBy: { createdAt: desc }) {
      id
      createdAt
      isResource
      
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
      poster {
        link
      }
      
      isOffer
      isResource
      isNews
    }
  }
`;

export const GET_NEWS_QUERY = gql`
  query {
    posts(where: { isNews: { equals: true } }, orderBy: { createdAt: desc }) {
      
      id
      createdAt
      isResource
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
      poster {
        link
      }
      isOffer
      isResource
      isNews
    }
  }
`;

export const GET_OFFERS_QUERY = gql`
  query {
    posts(where: {  isOffer: { equals: true } }, orderBy: { createdAt: desc }) {
      id
      
      createdAt
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
      poster {
        link
      }
      isOffer
      isResource
      isNews
    }
  }
`;

export const GET_PROJECT_QUERY = gql`
query{
  course(where: {
    id: 1
  }) {
    id
    name
    poster{
      link
    }
    description{
      sections{
        text
      }
    }
    shortDescription
  }
}
`;

export const ME_QUERY = gql`
  query {
    me {
      role
      avatar {
        link
      }
      firstname
      lastname
      email
      id
      publishedEvent(orderBy: { date: desc }) {
        id
        name
        poster {
          link
        }
        date
        shortDescription
        description
        organizer
        address
        theme
      }
     
      
    }
  }
`;

export const GET_USER_QUERY = gql`
  query ($id: Int) {
    user(where: { id: $id }) {
      firstname
      lastname
      avatar {
        link
      }
      bio
      shortDescription
      city
      publishedEvent(orderBy: { date: desc }) {
        id
        name
        poster {
          link
        }
        date
        shortDescription
        description
        organizer
        address
        theme
        format
      
      }
      
      
    }
  }
`;

export const GET_EVENTS_QUERY = gql`
query{
  streams{
    name
    streamKey
  }
}
`;

export const GET_STREAMS_QUERY = gql`
  query ($id: Int) {
    stream(where: { id: $id }) {
      id
      streamKey

    }
  }
`;
