import { gql } from '@apollo/client';

export const CREATE_GROUP = gql`
  mutation ($data: createGroupInput!) {
    createGroup(data: $data) {
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
    }
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation ($data: sendMessageInput!) {
    sendMessage(data: $data) {
      id
      text
      createdAt
      sender {
        id
        firstname
        lastname
      }
    }
  }
`;

export const CREATE_MEDIA_MUTATION = gql`
  mutation ($data: createMediaInput!) {
    createMedia(data: $data) {
      signedURL
    }
  }
`;

export const UPDATE_GROUP_MUTATION = gql`
  mutation ($data: updateGroupInput!) {
    updateGroup(data: $data) {
      id
      title
    }
  }
`;

export const ADD_MEMBERS_TO_GROUP_MUTATION = gql`
  mutation ($data: addMembersToGroupInput!) {
    addMembersToGroup(data: $data)
  }
`;

export const REMOVE_MEMBERS_FROM_GROUP_MUTATION = gql`
  mutation ($data: removeMembersFromGroupInput!) {
    removeMembersFromGroup(data: $data)
  }
`;

export const DELETE_GROUP_MUTATION = gql`
  mutation ($data: deleteGroupInput!) {
    deleteGroup(data: $data)
  }
`;

export const LEAVE_FROM_GROUP_MUTATION = gql`
  mutation ($data: leaveFromGroupInput!) {
    leaveFromGroup(data: $data)
  }
`;

export const SET_GROUP_ADMIN_MUTATION = gql`
  mutation ($data: setGroupAdminInput!) {
    setGroupAdmin(data: $data)
  }
`;

export const REMOVE_GROUP_ADMIN_MUTATION = gql`
  mutation ($data: removeGroupAdminInput!) {
    removeGroupAdmin(data: $data)
  }
`;
