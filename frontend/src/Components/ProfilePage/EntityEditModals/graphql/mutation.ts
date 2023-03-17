/*eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { gql, useMutation, FetchResult } from '@apollo/client';

export const UpdateEventMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [eventName] = useMutation(gql`
    mutation ($data: EventUpdatedInput!) {
      updateOneEvent(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    eventName({ variables: { data } });
};

export const UpdatePostMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [eventName] = useMutation(gql`
    mutation ($data: UpdatePostInput!) {
      postUpdateMutation(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    eventName({ variables: { data } });
};

export const UpdateUserDataMutation = () => {
  const [userId] = useMutation(gql`
    mutation ($data: updateUserInput) {
      updateUserData(data: $data) {
        firstname
      }
    }
  `);
  return (data: any) => userId({ variables: { data } });
};

export const GetUrlToUploadProfileAvatar = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};
