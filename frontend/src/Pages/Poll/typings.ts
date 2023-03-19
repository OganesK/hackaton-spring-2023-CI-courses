
export interface PollTypes {
    id: number;
    createdAt: Date;
    isResource?: boolean;
    isOffer?: boolean;
    isNews: boolean;
    title: string;
    description: string;
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
    poster: {
      link: string;
    };
    category: string;
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
  }
  