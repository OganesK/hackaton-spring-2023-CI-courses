export interface ResourceTypes {
  id: number;
  createdAt: Date;
  category: string;
  isResource: boolean;
  isOffer?: boolean;
  isNews?: boolean;
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
