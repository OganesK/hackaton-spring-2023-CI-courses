/*eslint-disable @typescript-eslint/no-unsafe-assignment*/
import { useMutation, gql } from '@apollo/client';

export const SEND_STREAM_MESSAGE_MUTATION = gql`
  mutation ($data: sendStreamMessageInput!) {
    sendStreamMessage(data: $data) {
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
