import { ApolloQueryResult } from '@apollo/client';
import { ProjectTypes } from '../../../../Pages/SingleProjectPage/graphql/typings';

export interface TariffTypes {
  id: number;
  title: string;
  price: number;
  buyerCount: number;
  description: string;
  isOwner: boolean;
  crowdId: number;
  refetch: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
}

export interface TariffCreateModalProps {
  open: boolean;
  handleOpenClose: () => void;
  crowdId: number;
  refetch: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
}

export interface TariffPayModalProps {
  open: boolean;
  handleOpenClose: () => void;
  tariffId: number;
  refetch: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
}

export interface UserDataTypes {
  firstname: string;
  lastname: string;
  email: string;
}
