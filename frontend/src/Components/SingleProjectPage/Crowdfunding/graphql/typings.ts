import { ApolloQueryResult } from '@apollo/client';
import { ProjectTypes } from '../../../../Pages/SingleProjectPage/graphql/typings';

export interface Section {
  number: number;
  type: string;
  text?: string;
  media?: {
    link: string;
  };
}

export interface TariffTypes {
  id: number;
  title: string;
  price: number;
  buyerCount: number;
  description: string;
}

export interface CrowdfundingTypes {
  id: number;
  createdAt: Date;
  title: string;
  shortDescription: string;
  poster: {
    link: string;
  };
  start: Date;
  end: Date;
  goalSum: number;
  nowSum: number;
  isApproved: boolean;
  story: {
    id: number;
    sections: Section[];
  };
  tariffs: TariffTypes[];
  isOwner: boolean;
  activeCheck: boolean;
  refetch: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
}
