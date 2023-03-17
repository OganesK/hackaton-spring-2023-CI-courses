import { gql } from '@apollo/client';

export const GET_MY_GROUPS = gql`
  query {
    getMyGroups {
      id
      avatar {
        id
        link
      }
      admins {
        id
      }
      type
      title
      members {
        id
        firstname
        lastname
        avatar {
          link
        }
      }
      messages {
        id
        text
        sender {
          id
        }
      }
    }
  }
`;

export const GET_MESSAGE_IN_GROUP = gql`
  query ($groupId: Int!) {
    getMessageInGroup(data: { groupId: $groupId }) {
      id
      admins {
        id
      }
      avatar {
        id
        link
      }
      type
      title
      members {
        id
        firstname
        lastname
        avatar {
          link
        }
      }
      messages {
        id
        createdAt
        text
        sender {
          id
          firstname
          lastname
          avatar {
            link
          }
        }
      }
      inviteURL
    }
  }
`;

export const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription ($groupId: Int!) {
    newMessage(data: { groupId: $groupId }) {
      id
      createdAt
      text
      sender {
        id
        firstname
        lastname
        avatar {
          link
        }
      }
    }
  }
`;

export const GET_USERS_WHICH_CAN_ADD_TO_GROUP = gql`
  query ($groupId: Int!) {
    getUsersWhichCanAddToGroup(data: { groupId: $groupId }) {
      id
      firstname
      lastname
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      firstname
      lastname
      avatar {
        id
        link
      }
    }
  }
`;
