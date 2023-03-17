export interface MatchProps {
  match: {
    path: string;
    isExact: boolean;
    url: string;
    params: {
      projectId: string;
    };
  };
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
  isApproved: boolean;
}

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
  activeCheck: boolean;
  story: {
    id: number;
    sections: Section[];
  };
  tariffs: TariffTypes[];
}

export interface ProjectTypes {
  id: number;
  name: string;
  shortDescription: string;
  description?: {
    id: number;
    sections: Section[];
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
  workers: WorkerTypes[];
  crowdFunding: CrowdfundingTypes[];
  updatedVariable?: {
    name: string;
    description?: {
      id: number;
      sections: Section[];
    };
    shortDescription: string;
    presentationMedia: {
      link: string;
      type: string;
    }[];
  };
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

// export interface EventTypes {
//   id: number;
//   date: Date;
//   poster: {
//     link: string;
//   };
//   shortDescription: string;
//   name: string;
//   organizer: string;
//   isApproved: boolean;
// }

export interface CompanyTypes {
  name: string;
  avatar: string;
  description: string;
  activityKind: string;
  contact: {
    emails: string[];
    phones: string[];
    adresses: string[];
  };
  projects: {
    id: number;
    name: string;
    description: string;
    poster: string;
    shortDescription: string;
    presentationMedia: string[];
  }[];
}
