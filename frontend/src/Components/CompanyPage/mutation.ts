import { gql, useMutation } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
  mutation ($data: createProjectInput!) {
    createOneProject(data: $data) {
      id
    }
  }
`;

export const CREATE_CONTACT_MUTATION = gql`
  mutation ($data: ContactCreateInput!) {
    createOneContact(data: $data) {
      id
    }
  }
`;

export const UpdateContactsMutation = () => {
  const [uploadUrl] = useMutation<{ putCompanyAvatar: { signedURL: string } }>(gql`
    mutation ($data: updateContactInput!) {
      updateContact(data: $data)
    }
  `);
  return (data: { contactId: number; phones?: string[]; emails?: string[]; adresses?: string[] }) =>
    uploadUrl({ variables: { data } });
};
