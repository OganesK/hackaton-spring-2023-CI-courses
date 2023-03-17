/*eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { useMutation, gql, FetchResult } from '@apollo/client';

export const UpdateProjectMutation = () => {
  const [projectId] = useMutation(gql`
    mutation ($data: updateProjectInput!) {
      updateProject(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    projectId({ variables: { data } });
};

export const GetUrlToUploadProjectPoster = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};
