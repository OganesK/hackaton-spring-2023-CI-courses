/*eslint-disable @typescript-eslint/no-unsafe-assignment*/
import { useMutation, gql } from '@apollo/client';

export const REGISTER_FOR_EVENT_MUTATION = gql`
  mutation ($data: RegisterForEventInput!) {
    registerForEvent(data: $data)
  }
`;

// export const CREATE_STREAM_MUTATION = gql`
//   mutation ($data: createStreamArgs!) {
//     createStream(data: $data) {
//       id
//       streamKey
//     }
//   }
// `;

export const CreateStreamMutation = () => {
  const [streamId] = useMutation<{ createStream: { streamKey: string } }>(
    gql`
      mutation ($data: createStreamArgs!) {
        createStream(data: $data) {
          id
          streamKey
        }
      }
    `,
  );
  return (data: any) => streamId({ variables: { data } });
};

export const UpdateStreamMutation = () => {
  const [streamId] = useMutation<{ updateStream: { streamKey: string } }>(
    gql`
      mutation ($data: createStreamArgs!) {
        updateStream(data: $data) {
          id
          streamKey
          active
        }
      }
    `,
  );
  return (data: any) => streamId({ variables: { data } });
};

export const UpdateStreamActivityMutation = () => {
  const [streamActivityId] = useMutation<{ updateStreamActivity: { streamKey: string } }>(
    gql`
      mutation ($data: updateStreamActivityArgs!) {
        updateStreamActivity(data: $data) {
          id
          streamKey
          active
        }
      }
    `,
  );
  return (data: any) => streamActivityId({ variables: { data } });
};
