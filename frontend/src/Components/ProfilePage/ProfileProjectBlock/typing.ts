export interface ProfileProjectProps {
  userid?: number;
  isOwner?: boolean;
  refetch: any;
  workActivity: {
    id: number;
    poster?: {
      link: string;
    };
    name: string;
    shortDescription: string;
    presentationMedia: string[];
    isApproved: boolean;
    category: string;
    updatedVariable?: {
      name: string;
      shortDescription: string;
      poster?: {
        link: string;
      };
      presentationMedia: {
        link: string;
      };
    };
  }[];
  companiesOwner?: {
    id: number;
    name: string;
  }[];
}

export interface ProjectPosterProps {
  projectId: number;
  header: string;
  img?: string;
  shortDescription: string;
  isApproved: boolean;
  isOwner: boolean;
  category: string;
  updatedVariable?: {
    name: string;
    shortDescription: string;
    poster?: {
      link: string;
    };
    presentationMedia: {
      link: string;
    };
  };
}
