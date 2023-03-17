import { ApolloQueryResult } from '@apollo/client';

import { UserDataTypes } from '../../../../Pages/ProfilePage/graphql/typings';

export interface EventEditModalProps {
  open: boolean;
  handleOpenClose: () => void;
  eventId: number;
  refetch: () => Promise<ApolloQueryResult<{ user: UserDataTypes }>>;
}

export interface PostEditModalProps {
  open: boolean;
  handleOpenClose: () => void;
  ownerId: number;
  postid: number;
  isOfferFilter: boolean;
  isResourceFilter: boolean;
  isNewsFilter: boolean;
}

export interface ProfileTypes {
  id: number;
  firstname: string;
  lastname: string;
  avatar: {
    link: string;
  };
  shortDescription: string;
  bio: string;
  city: string;
}

export interface ProfileEditModalProps {
  open: boolean;
  handleOpenClose: () => void;
  userId: number;
}
