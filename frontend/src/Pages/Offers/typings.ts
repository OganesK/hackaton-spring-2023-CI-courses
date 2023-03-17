export interface OfferTypes {
  id: number;
  createdAt: Date;
  isResource?: boolean;
  isOffer: boolean;
  isNews?: boolean;
  title: string;
  description: string;
  poster: {
    link: string;
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
