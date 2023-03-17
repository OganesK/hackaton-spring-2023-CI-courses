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

export const UpdateContactsMutation = () => {
  const [uploadUrl] = useMutation<{ putCompanyAvatar: { signedURL: string } }>(gql`
    mutation ($data: updateContactInput!) {
      updateContact(data: $data)
    }
  `);
  return (data: { contactId: number; phones?: string[]; emails?: string[]; adresses?: string[] }) =>
    uploadUrl({ variables: { data } });
};

export const CreateEventMutation = () => {
  const [eventId] = useMutation<{ createOneEvent: { id: number } }>(gql`
    mutation ($data: EventCreatedInput!) {
      createOneEvent(data: $data) {
        id
      }
    }
  `);
  return (data: any) => eventId({ variables: { data } });
};

export const GetUrlToUploadEventPoster = () => {
  const [uploadUrl] = useMutation<{ createMedia: { signedURL: string } }>(gql`
    mutation ($data: createMediaInput!) {
      createMedia(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};
