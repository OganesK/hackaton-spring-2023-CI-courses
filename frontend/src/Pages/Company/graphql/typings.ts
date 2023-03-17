export interface MatchProps {
  match: {
    path: string;
    isExact: boolean;
    url: string;
    params: {
      companyId: string;
    };
  };
}

export interface CompanyTypes {
  name: string;
  avatar: {
    link: string;
  };
  description: string;
  activityKind: string;
  createdAt: Date;
  owner: {
    id: number;
    firstname: string;
    lastname: string;
  };
  contact: {
    id: number;
    emails: string[];
    phones: string[];
    adresses: string[];
    isApproved: boolean;
  };
  inn: string;
  mainRegion: string;
  mainContact: string;
  projects: {
    id: number;
    name: string;
    description?: {
      id: number;
      sections: Section[];
    };
    poster: {
      link: string;
    };
    shortDescription: string;
    presentationMedia: string[];
    isApproved: boolean;
    category: string;
    updatedVariable?: {
      name: string;
      shortDescription: string;
      description?: {
        id: number;
        sections: Section[];
      };
      poster: {
        link: string;
      };
      presentationMedia: {
        link: string;
      };
    };
  }[];
  updatedVariable?: {
    name: string;
    avatar: {
      link: string;
    };
    shortDescription: string;
    description: string;
  };
}

interface Section {
  number: number;
  type: string;
  text?: string;
  media?: {
    link: string;
  };
}
