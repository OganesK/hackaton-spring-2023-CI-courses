import { ApolloQueryResult } from '@apollo/client';

interface Section {
  number: number;
  type: string;
  text?: string;
  media?: {
    link: string;
  };
}

export interface PostTypes {
  refetch: () => Promise<ApolloQueryResult<{ post: PostTypes }>>;
  id: number;
  title: string;
  description: string;
  articleBody: string;
  article?: {
    id: number;
    sections: Section[];
  };
  poster: {
    link: string;
  };
  type: string;
  project: {
    name: string;
  };
  createdAt: Date;
  isOffer?: boolean;
  isResource?: boolean;
  isNews?: boolean;
  post?: {
    title: string;
    description: string;
    articleBody: string;
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
    project: {
      name: string;
    };
    poster: {
      link: string;
    };
    type: string;
    createdAt: Date;
    isOffer?: boolean;
    isResource?: boolean;
    isNews?: boolean;
  };
}

export interface ProjectTypes {
  refetch: () => Promise<ApolloQueryResult<{ project: ProjectTypes }>>;
  id: number;
  name: string;
  shortDescription: string;
  poster: {
    link: string;
  };
  presentationMedia?: {
    link: string;
  };
  description?: {
    id: number;
    sections: Section[];
  };
  ownerCompany: {
    name: string;
  };
  createdAt: Date;
  category: string;
  project?: {
    name: string;
    shortDescription: string;
    poster?: {
      link: string;
    };
    presentationMedia?: {
      link: string;
    };
    description?: {
      id: number;
      sections: Section[];
    };
    ownerCompany: {
      name: string;
    };
    createdAt: Date;
    category: string;
  };
}

export interface CompanyTypes {
  refetch: () => Promise<ApolloQueryResult<{ company: CompanyTypes }>>;
  id: number;
  name: string;
  avatar: {
    link: string;
  };
  shortDescription: string;
  description: string;
  owner: {
    firstname: string;
    lastname: string;
  };
  createdAt: Date;
  activityKind: string;
  company?: {
    name: string;
    avatar: {
      link: string;
    };
    shortDescription: string;
    description: string;
    owner: {
      firstname: string;
      lastname: string;
    };
    createdAt: Date;
  };
}

export interface EventTypes {
  refetch: () => Promise<ApolloQueryResult<{ event: EventTypes }>>;
  id: number;
  name: string;
  poster: {
    link: string;
  };
  category: string;
  shortDescription: string;
  description: string;
  organizer: string;
  user: {
    firstname: string;
    lastname: string;
  };
  date: Date;
  address: string;
  theme: string;
  format?: string;
  event?: {
    id: number;
    name: string;
    poster: {
      link: string;
    };
    category: string;
    shortDescription: string;
    description: string;
    organizer: string;
    date: Date;
  };
}

export interface ContactTypes {
  refetch: () => Promise<ApolloQueryResult<{ contact: ContactTypes }>>;
  id: number;
  phones: string[];
  emails: string[];
  adresses: string[];
  contact?: {
    phones: string[];
    emails: string[];
    adresses: string[];
    ownerCompany: {
      name: string;
      avatar: string;
      id: number;
    };
  };
  ownerCompany: {
    name: string;
    avatar: string;
    id: number;
  };
}

export interface CrowdTypes {
  refetch: () => Promise<ApolloQueryResult<{ crowdFunding: CrowdTypes }>>;
  id: number;
  title: string;
  shortDescription: string;
  poster: {
    link: string;
  };
  story?: {
    id: number;
    sections: Section[];
  };
  project: {
    name: string;
  };
  createdAt: Date;
  start: Date;
  end: Date;
  goalSum: number;
  nowSum: number;
  tariffs: {
    id: number;
    createdAt: Date;
    title: string;
    price: number;
    description: string;
  }[];
  crowdFunding?: {
    id: number;
    title: string;
    shortDescription: string;
    poster: {
      link: string;
    };
    createdAt: Date;
    start: Date;
    end: Date;
    goalSum: number;
    nowSum: number;
    tariffs: {
      id: number;
      createdAt: Date;
      title: string;
      price: number;
      description: string;
    }[];
  };
}

export interface ModerationContentTypes {
  projectRefetch: () => any;
  companiesRefetch: () => any;
  contactsRefetch: () => any;
  eventsRefetch: () => any;
  postsRefetch: () => any;
  crowdsRefetch: () => any;
  id: number;
  title: string;
  type: string;
  poster: string;
  presentationMedia?: string;
  shortDescription?: string;
  article?: {
    id: number;
    sections: Section[];
  };
  story?: {
    id: number;
    sections: Section[];
  };
  description: string;
  owner: string | undefined;
  createdAt?: Date;
  categoryOfObject?: string;
  isNew: boolean;
  isProject?: boolean;
  isEvent?: boolean;
  isCompany?: boolean;
  isPost?: boolean;
  isContact?: boolean;
  isCrowd?: boolean;
  tariffs?: {
    id: number;
    createdAt: Date;
    title: string;
    description: string;
    price: number;
  }[];
  isPostNews?: boolean;
  isPostOffer?: boolean;
  isPostResource?: boolean;
  isContactPhones?: string;
  isContactAddresses?: string;
  isContactEmails?: string;
  organizer?: string;
  user?: {
    firstname: string;
    lastname: string;
  };
  address?: string;
  theme?: string;
  format?: string;
  ownerCompanyId?: number;
}
