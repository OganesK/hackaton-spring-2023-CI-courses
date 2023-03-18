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
        isApproved
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
    projects(where: { isApproved: { equals: true } }, orderBy: { createdAt: desc }) {
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
      isApproved
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
    crowdFundings(where: { isApproved: { equals: true } }, orderBy: { createdAt: desc }) {
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
      isApproved
      activeCheck
    }
  }
`;

export const GET_RESOURCES_QUERY = gql`
  query {
    posts(where: { isApproved: { equals: true }, isResource: { equals: true } }, orderBy: { createdAt: desc }) {
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
    posts(where: { isApproved: { equals: true }, isNews: { equals: true } }, orderBy: { createdAt: desc }) {
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
    posts(where: { isApproved: { equals: true }, isOffer: { equals: true } }, orderBy: { createdAt: desc }) {
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
      isApproved
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
        isApproved
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
        isApproved
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
        isApproved
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
      ownerCompanies {
        id
        name
        avatar {
          link
        }
        description
        projects {
          id
          name
        }
        isApproved
      }
      inWorks {
        id
        position
        project {
          id
          name
        }
        publishedPosts(orderBy: { createdAt: desc }) {
          poster {
            link
          }
          description
          title
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
        isApproved
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
      inWorks {
        project {
          id
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
          isApproved
          poster {
            link
          }
          category
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
            isApproved
          }
          presentationMedia {
            link
          }
        }
      }
      ownerCompanies {
        id
        name
        avatar {
          link
        }
        shortDescription
        isApproved
        createdAt
        activityKind
        projects {
          id
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
          isApproved
          category
          poster {
            link
          }
          publishedPosts(orderBy: { createdAt: desc }) {
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
            isApproved
          }
          presentationMedia {
            link
          }
        }
      }
    }
  }
`;

export const GET_EVENTS_QUERY = gql`
  query {
    events(where: { isApproved: { equals: true } }, orderBy: { date: desc }) {
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
