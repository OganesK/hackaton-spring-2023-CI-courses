/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
import { useMutation, gql, FetchResult } from '@apollo/client';

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

export const DELETE_ARTICLE_MUTATION = gql`
  mutation ($data: DeleteArticleInput!) {
    articleDeleteMutation(data: $data)
  }
`;

export const CREATE_PROJECT_DESCRIPTION_MUTATION = gql`
  mutation ($data: CreateDescriptionInput!) {
    descriptionCreateMutation(data: $data)
  }
`;

export const UPDATE_PROJECT_DESCRIPTION_MUTATION = gql`
  mutation ($data: UpdateDescriptionInput!) {
    descriptionUpdateMutation(data: $data)
  }
`;

export const DELETE_PROJECT_DESCRIPTION_MUTATION = gql`
  mutation ($data: DeleteDescriptionInput!) {
    descriptionDeleteMutation(data: $data)
  }
`;

export const CREATE_CROWDFUNDING_ARTICLE_MUTATION = gql`
  mutation ($data: CreateStoryInput!) {
    storyCreateMutation(data: $data)
  }
`;

export const UPDATE_CROWDFUNDING_ARTICLE_MUTATION = gql`
  mutation ($data: UpdateStoryInput!) {
    storyUpdateMutation(data: $data)
  }
`;

export const DELETE_CROWDFUNDING_ARTICLE_MUTATION = gql`
  mutation ($data: DeleteStoryInput!) {
    storyDeleteMutation(data: $data)
  }
`;

export const UploadMediaMutation = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string; mediaURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
        mediaURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};
