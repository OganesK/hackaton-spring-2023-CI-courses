import { gql } from '@apollo/client';

export const GET_CONFIG_QUERY = gql`
  query {
    getPlatformConfig {
      totalProjectCount
      totalCompanyCount
      totalBudgetInvestment
      totalExtraBudgetInvestment
      platformTagline
      platformTitle
      platformDescription
      platformShortDescription
      projectsShownOnLanding {
        id
        name
        shortDescription
        category
        presentationMedia {
          type
          link
        }
        poster {
          link
        }
        workers {
          worker {
            id
            firstname
            lastname
          }
        }
      }
      newsShownOnLanding {
        title
        description
        author {
          worker {
            id
            firstname
            lastname
            avatar {
              link
            }
          }
        }
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
        createdAt
        poster {
          link
        }
      }
      crowdFundingsShownOnLanding {
        id
        title
        shortDescription
        goalSum
        nowSum
        project {
          id
          name
          category
          poster {
            link
          }
        }
        activeCheck
      }
      offersShownOnLanding {
        id
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
        createdAt
        poster {
          link
        }
        author {
          worker {
            id
            avatar {
              link
            }
            firstname
            lastname
          }
        }
      }
    }
  }
`;

export const GET_PROJECTS_QUERY = gql`
  query {
    projects(where: {  }, orderBy: { createdAt: desc }) {
      id
      category
      name
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
      shortDescription
      presentationMedia {
        link
        type
      }
      poster {
        link
      }
      ownerCompany {
        owner {
          id
        }
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
        category
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
      category
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
      category
      author {
        worker {
          id
          avatar {
            link
          }
          firstname
          lastname
        }
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
      category
      id
      createdAt
      isResource
      title
      description
      author {
        worker {
          id
          avatar {
            link
          }
          firstname
          lastname
        }
      }
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
      category
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
      author {
        worker {
          id
          avatar {
            link
          }
          firstname
          lastname
        }
      }
      isOffer
      isResource
      isNews
    }
  }
`;

export const GET_PROJECT_QUERY = gql`
  query ($id: Int!) {
    project(where: { id: $id }) {
      id
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
      
      presentationMedia {
        link
        type
      }
      publishedPosts(orderBy: { createdAt: desc }) {
        id
        createdAt
        title
        isOffer
        isResource
        isNews
        poster {
          link
        }
        description
        category
        author {
          worker {
            avatar {
              link
            }
            firstname
            lastname
          }
        }
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
        
      }
      ownerCompany {
        id
        name
      }
      crowdFunding {
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
        
        activeCheck
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
        tariffs {
          id
          title
          price
          buyerCount
          description
        }
      }
      workers {
        id
        position
        worker {
          id
          firstname
          lastname
          avatar {
            link
          }
        }
      }
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
        
        stream {
          id
          streamKey
          event {
            id
            date
          }
          active
        }
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
        
        stream {
          id
          streamKey
          event {
            id
            date
          }
          active
        }
      }
      
      
    }
  }
`;

export const GET_EVENTS_QUERY = gql`
  query {
    events(where: { }, orderBy: { date: desc }) {
      id
      name
      poster {
        link
      }
      category
      description
      shortDescription
      date
      organizer
      format
      theme
      address
      stream {
        id
        streamKey
        event {
          id
          date
        }
        active
      }
      user {
        publishedEvent {
          id
        }
      }
    }
  }
`;

export const GET_STREAMS_QUERY = gql`
  query ($id: Int) {
    stream(where: { id: $id }) {
      id
      streamKey
      event {
        id
        date
      }
    }
  }
`;
