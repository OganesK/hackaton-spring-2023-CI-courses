/*eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { gql, useMutation, FetchResult } from '@apollo/client';

export const UpdateCrowdMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [crowdName] = useMutation(gql`
    mutation ($data: crowdFundingUpdateInput!) {
      crowdFundingUpdateMutation(data: $data) {
        id
      }
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    crowdName({ variables: { data } });
};

export const UpdateTariffMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [tariffName] = useMutation(gql`
    mutation ($data: UpdateTariffInput!) {
      tariffUpdateMutation(data: $data) {
        id
      }
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    tariffName({ variables: { data } });
};
