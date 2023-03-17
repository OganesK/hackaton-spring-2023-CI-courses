export interface NewsTypes {
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

export interface LastNewsProps {
  newsShownOnLanding?: Array<NewsTypes>;
}

export interface NewsProps {
  headline: string;
  shortDescription: string;
  workerId: number;
  firstname: string;
  lastname: string;
  ownerAvatar: string;
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
  date: Date;
  img: string;
}
