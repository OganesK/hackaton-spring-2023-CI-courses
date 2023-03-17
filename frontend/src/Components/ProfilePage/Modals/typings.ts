import { ApolloQueryResult } from '@apollo/client';
import { CompanyTypes } from '../../../Pages/Company/graphql/typings';
import { UserDataTypes } from '../../../Pages/ProfilePage/graphql/typings';
import { ProjectTypes } from '../../../Pages/SingleProjectPage/graphql/typings';

export interface CompanyCreateModalProps {
  open: boolean;
  handleOpenClose: () => void;
  ownerId: number;
  refetch: () => Promise<ApolloQueryResult<{ user: UserDataTypes }>>;
}

export interface ProjectCreateModalProps {
  open: boolean;
  handleOpenClose: () => void;
  ownerId: number;
  isProfilePage?: boolean;
  refetchOnProfilePage?: () => Promise<ApolloQueryResult<{ user: UserDataTypes }>>;
  refetchOnCompanyPage?: () => Promise<ApolloQueryResult<{ company: CompanyTypes }>>;
}

export interface EventCreateModalProps {
  open: boolean;
  handleOpenClose: () => void;
  userId: number;
  refetch: () => Promise<ApolloQueryResult<{ user: UserDataTypes }>>;
}

export interface PostCreateModalProps {
  open: boolean;
  handleOpenClose: () => void;
  isProjectPage?: boolean;
  projectId: number;
  isOfferFilter: boolean;
  isResourceFilter: boolean;
  isNewsFilter: boolean;
  refetchOnProfilePage?: () => Promise<ApolloQueryResult<{ user: UserDataTypes }>>;
  refetchOnProjectPage?: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
}
