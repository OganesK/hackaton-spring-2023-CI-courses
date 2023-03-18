import { ApolloQueryResult, OperationVariables } from '@apollo/client';

import { ProjectTypes } from '../../Pages/SingleProjectPage/graphql/typings';

export interface ImageSliderProps {
  refetch: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
  images: { link: string; type: string }[];
  projectId: number;
  notApprovedImage?: boolean;
  editableFields: boolean;
}

export interface WorkerCardTypes {
  firstName: string;
  lastName: string;
  position: string;
  avatar: string;
  userId: number;
  workerId: number;
  isOwner: boolean;
  userInfo: number;
  refetch: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
}

export interface SwitchToChatTypes {
  data?: {
    switchToMessager: {
      id: number;
      members: {
        firstname: string;
        lastname: string;
      }[];
    };
    messages: {
      sender: {
        firstname: string;
        lastname: string;
      };
      text: string;
    }[];
  };
}

export interface UserTypes {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string;
  inWorks: {
    project: {
      id: number;
    };
  }[];
}

export interface AutoCompleteTypes {
  projectId: number;
  projectWorkers: {
    worker: {
      firstname: string;
      lastname: string;
    };
  }[];
  refetch: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
}

export interface UserDataQueryTypes {
  loading: boolean;
  users: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: string;
    inWorks: {
      project: {
        id: number;
      };
    }[];
  }[];
}

interface ContentBlockProps {
  id: number;
  createdAt: Date;
  isOffer?: boolean;
  isResource?: boolean;
  isNews?: boolean;
  poster: {
    link: string;
  };
  tags?: string;
  title: string;
  description: string;
  category: string;
  author: {
    worker: {
      id: number;
      firstname: string;
      lastname: string;
      avatar: {
        link: string;
      };
    };
  };
  article?: {
    id: number;
    sections: {
      id: number;
      number: number;
      type: string;
      text?: string;
      media?: {
        link: string;
      };
    }[];
  };
  : boolean;
}

export interface SingleProjectsContentProps {
  contentValues: Array<ContentBlockProps>;
  isOwner: boolean;
  isNoPostAtUser: boolean;
  selectedPostCategory: string;
  value: string;
  ownerId: number;
  setSelectedPostCategory: React.Dispatch<React.SetStateAction<string>>;
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<
    ApolloQueryResult<{
      project: ProjectTypes;
    }>
  >;
}

export interface NavigationProps {
  isDescription: boolean;
  // isWorkers: boolean;
  isCrowd: boolean;
  isResources: boolean;
  isNews: boolean;
  isOwner: boolean;
}
