export interface ResourceCardProps {
  id: number;
  createdAt: Date;
  title: string;
  category: string;
  shortDescription: string;
  img: string;
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
  workerId: number;
  firstname: string;
  lastname: string;
  ownerAvatar: string;
  isResource: boolean;
  isOffer: boolean;
  isNews: boolean;
}
