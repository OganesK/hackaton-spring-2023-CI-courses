import { gql } from '@apollo/client';

export const NEW_STREAM_MESSAGES_SUBSCRIPTION = gql`
  subscription ($streamId: Int!) {
    streamChat(data: { streamId: $streamId }) {
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

export const MESSAGES_IN_STREAM_QUERY = gql`
  query ($data: getMessageInStreamInput!) {
    getMessageInStream(data: $data) {
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
