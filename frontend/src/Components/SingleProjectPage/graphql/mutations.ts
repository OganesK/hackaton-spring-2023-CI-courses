/*eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { useMutation, gql, FetchResult } from '@apollo/client';

export const UpdatePostMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [eventName] = useMutation(gql`
    mutation ($data: updatePostInput!) {
      updatePost(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    eventName({ variables: { data } });
};

export const CreateOfferMutation = () => {
  const [offerId] = useMutation<{ createOnePost: { id: number } }>(gql`
    mutation ($data: CreatePostInput!) {
      postCreateMutation(data: $data) {
        id
      }
    }
  `);
  return (data: any) => offerId({ variables: { data } });
};

export const DeleteMediaMutation = () => {
  const [success] = useMutation(gql`
    mutation ($data: deleteProjectPresentationMedia!) {
      deleteProjectPresentationMedia(data: $data)
    }
  `);

  return (data: { mediaUrl: string }) => success({ variables: { data } });
};

export const GetUrlToUploadMediaMutation = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};

export const GetUrlToUploadPosterMutation = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};

export const GetUrlToUploadPostPoster = () => {
  const [uploadUrl] = useMutation<{ putPostPoster: { signedURL: string } }>(gql`
    mutation ($data: getMediaDataInput!) {
      putPostPoster(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};

export const GetUrlToUploadEventPoster = () => {
  const [uploadUrl] = useMutation<{ putEventPoster: { signedURL: string } }>(gql`
    mutation ($data: mediaInput!) {
      putEventPoster(data: $data) {
        signedURL
      }
    }
  `);

  return (data: any) => uploadUrl({ variables: { data } });
};

export const GetUrlToUploadCrowdfundingPoster = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};

export const CreateCrowdfundingMutation = () => {
  const [uploadUrl] = useMutation<{ crowdFundingCreateMutation: { id: number } }>(gql`
    mutation ($data: crowdFundingCreateInput!) {
      crowdFundingCreateMutation(data: $data) {
        id
      }
    }
  `);

  return (data: any) => uploadUrl({ variables: { data } });
};

export const CreateNewWorkerMutation = () => {
  const [response] = useMutation(gql`
    mutation ($data: WorkerCreateInput!) {
      createOneWorker(data: $data) {
        project {
          id
        }
      }
    }
  `);

  return (data: any) => response({ variables: { data } });
};

export const DeleteOneWorkerMutation = () => {
  const [response] = useMutation(gql`
    mutation ($workerId: Int!) {
      deleteOneWorker(where: { id: $workerId }) {
        id
      }
    }
  `);

  return (workerId: number) => response({ variables: { workerId } });
};

export const SwitchToChat = () => {
  const [userId] = useMutation(gql`
    mutation ($data: switchToMessagerInput!) {
      switchToMessager(data: $data) {
        id
        members {
          firstname
          lastname
        }
        messages {
          sender {
            firstname
            lastname
          }
          text
        }
      }
    }
  `);
  return (data: any) => userId({ variables: { data } });
};

export const PutPostPosterMutation = () => {
  const [response] = useMutation<{ putPostPoster: { signedURL: string } }>(gql`
    mutation ($data: getMediaDataInput!) {
      putPostPoster(data: $data) {
        signedURL
      }
    }
  `);

  return (data: any) => response({ variables: { data } });
};

export const DeleteOnePostMutation = () => {
  const [response] = useMutation(gql`
    mutation ($postId: Int!) {
      deleteOnePost(where: { id: $postId }) {
        id
      }
    }
  `);

  return (postId: number) => response({ variables: { postId } });
};
