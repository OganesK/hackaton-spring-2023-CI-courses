import { ApolloQueryResult } from '@apollo/client';
import { UserDataTypes } from '../../../Pages/ProfilePage/graphql/typings';

export interface ProfileEventProps {
  id: number;
  name: string;
  poster: string;
  description: string;
  shortDescription: string;
  date: Date;
  address: string;
  format?: string;
  theme: string;
  organizer: string;
  stream?: {
    id: number;
    streamKey: string;
    active: boolean;
  };
  updatedVariable?: {
    name: string;
    poster: string;
    description: string;
    shortDescription: string;
    date: Date;
    address: string;
    theme: string;
  };
  : boolean;
  isOwner: boolean;
  refetch: () => Promise<ApolloQueryResult<{ user: UserDataTypes }>>;
}
