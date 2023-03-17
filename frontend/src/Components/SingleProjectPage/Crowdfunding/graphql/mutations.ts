/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
import { useMutation, gql, FetchResult } from '@apollo/client';

export const DELETE_CROWDFUNDING_MUTATION = gql`
  mutation ($data: crowdFundingDeleteInput!) {
    crowdFundingDeleteMutation(data: $data)
  }
`;

export const CreateTariffMutation = () => {
  const [uploadUrl] = useMutation<{ tariffCreateMutation: { id: number } }>(gql`
    mutation ($data: CreateTariffInput!) {
      tariffCreateMutation(data: $data) {
        id
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};

export const DELETE_TARIFF_MUTATION = gql`
  mutation ($data: DeleteTariffInput!) {
    tariffDeleteMutation(data: $data)
  }
`;

export const PayTariffMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [tariffName] = useMutation(gql`
    mutation ($data: PayForTariffInput!) {
      payForTariff(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    tariffName({ variables: { data } });
};
