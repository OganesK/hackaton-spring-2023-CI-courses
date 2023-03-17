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

export const CreateOfferMutation = () => {
  const [offerId] = useMutation<{ postCreateMutation: { id: number } }>(gql`
    mutation ($data: CreatePostInput!) {
      postCreateMutation(data: $data) {
        id
      }
    }
  `);
  return (data: any) => offerId({ variables: { data } });
};

export const GetUrlToUploadPostPoster = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
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

export const DeleteOneEventMutation = () => {
  const [response] = useMutation(gql`
    mutation ($eventId: Int!) {
      deleteOneEvent(where: { id: $eventId }) {
        id
      }
    }
  `);

  return (eventId: number) => response({ variables: { eventId } });
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

export const PutEventPosterMutation = () => {
  const [response] = useMutation<{ putEventPoster: { signedURL: string } }>(gql`
    mutation ($data: getMediaDataInput!) {
      putEventPoster(data: $data) {
        signedURL
      }
    }
  `);

  return (data: any) => response({ variables: { data } });
};

export const GetUrlToUploadMedia = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};

export const CreateProjectMutation = () => {
  const [projectId] = useMutation<{ createOneProject: { id: number } }>(gql`
    mutation ($data: createProjectInput!) {
      createOneProject(data: $data) {
        id
      }
    }
  `);
  return (data: any) => projectId({ variables: { data } });
};

export const CreateCompanyMutation = () => {
  const [companyId] = useMutation<{ createCompany: { id: number } }>(gql`
    mutation ($data: createCompanyInput!) {
      createCompany(data: $data) {
        id
      }
    }
  `);
  return (data: any) => companyId({ variables: { data } });
};

export const CREATE_ARTICLE_MUTATION = gql`
  mutation ($data: CreateArticleInput!) {
    articleCreateMutation(data: $data)
  }
`;

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation ($data: UpdateArticleInput!) {
    articleUpdateMutation(data: $data)
  }
`;
