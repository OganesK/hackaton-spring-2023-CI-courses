import { ApolloQueryResult } from '@apollo/client';
import { ProjectTypes } from '../../../../Pages/SingleProjectPage/graphql/typings';

export interface CrowdfundingCreateModalProps {
  open: boolean;
  handleOpenClose: () => void;
  projectId: number;
  refetch: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
}

export interface ProjectEditTypes {
  id: number;
  name: string;
  shortDescription: string;
  poster: {
    link: string;
  };
  category: string;
  industrialDirections: string;
  projectSite: string;
  projectType: string;
  projectStage: string;
  projectMarket: string;
  technologyType: string;
  investmentStage: string;
  salesType: string;
  businessModel: string;
  mainGoal: string;
}

export interface ProjectEditModalProps {
  open: boolean;
  handleOpenClose: () => void;
  projectId: number;
}
