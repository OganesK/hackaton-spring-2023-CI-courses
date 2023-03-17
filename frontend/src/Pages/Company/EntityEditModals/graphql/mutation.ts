/*eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { gql, useMutation } from '@apollo/client';

export const UpdateMyCompanyMutation = () => {
  const [companyId] = useMutation(gql`
    mutation ($data: updateCompanyInput!) {
      updateMyCompany(data: $data)
    }
  `);
  return (data: any) => companyId({ variables: { data } });
};

export const GetUrlToUploadCompanyAvatar = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};
