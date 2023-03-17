export interface OffersTypes {
  id: number;
  createdAt: Date;
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
  poster: {
    link: string;
  };
}

export interface OffersProps {
  offersOnLanding?: Array<OffersTypes>;
  refetch: () => any;
}
