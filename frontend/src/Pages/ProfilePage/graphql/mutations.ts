/*eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { gql, useMutation } from '@apollo/client';

export const CreateCompanyMutation = () => {
  const [companyId] = useMutation(
    gql`
      mutation ($data: createCompanyInput!) {
        createCompany(data: $data) {
          name
        }
      }
    `,
  );
  return (data: any) => companyId({ variables: { data } });
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

export const UploadImageMutation = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};

export const SwitchToChat = () => {
  const [userId] = useMutation(gql`
    mutation ($data: switchToMessagerInput!) {
      switchToMessager(data: $data) {
        id
        title
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
