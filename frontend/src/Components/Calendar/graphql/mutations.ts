/*eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { useMutation, gql } from '@apollo/client';

export const EmailDispatchMutation = () => {
  const [emailId] = useMutation<{ addEmail: { id: number } }>(gql`
    mutation ($data: addEmail!) {
      addEmail(data: $data) {
        id
      }
    }
  `);
  return (data: any) => emailId({ variables: { data } });
};
