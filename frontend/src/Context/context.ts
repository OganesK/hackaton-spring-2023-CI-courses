import { createContext } from 'react';

export interface CompaniesTypes {
  id: number;
  name: string;
  avatar: string;
  description: string;
  projects: ProjectType[];
}

export interface PostTypes {
  id: number;
  createdAt: Date;
  isOffer: boolean;
  isResource: boolean;
  isNews: boolean;
  poster: {
    link: string;
  };
  tags: string;
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
  isApproved: boolean;
}

interface PublishedEventsType {
  id: number;
}

export interface Section {
  number: number;
  type: string;
  text?: string;
  media?: {
    link: string;
  };
}

export interface Tariff {
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
  activeCheck: boolean;
  story: {
    id: number;
    sections: Section[];
  };
  tariffs: Tariff[];
}

export interface WorkerTypes {
  id: number;
  position: string;
  worker: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: {
      link: string;
    };
  };
}

export interface ProjectType {
  id: number;
  name: string;
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
  shortDescription: string;
  description?: {
    id: number;
    sections: Section[];
  };
  isApproved: boolean;
  publishedPosts: PostTypes[];
  presentationMedia: {
    link: string;
    type: string;
  }[];
  ownerCompany: {
    id: number;
    name: string;
  };
  crowdFunding: CrowdfundingTypes[];
  workers: WorkerTypes[];
}

interface InWorks {
  id: number;
  position: string;
  project: ProjectType;
}

export interface ContextUserTypes {
  user: {
    id: number;
    firstname: string;
    lastname: string;
    bio: string;
    email: string;
    ownerCompanies: CompaniesTypes[];
    publishedEvent: PublishedEventsType[];
    inWorks: InWorks[];
    avatar: {
      link: string;
    };
    role: string;
  };
}

export const userContext = createContext<ContextUserTypes>({
  user: {
    id: 0,
    firstname: 'string',
    lastname: 'string',
    bio: 'string',
    email: 'string',
    ownerCompanies: [],
    publishedEvent: [],
    inWorks: [],
    avatar: {
      link: '',
    },
    role: 'string',
  },
});
