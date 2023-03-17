export interface NewsCardProps {
  id: number;
  createdAt: Date;
  title: string;
  shortDescription: string;
  workerId: number;
  firstname: string;
  lastname: string;
  ownerAvatar: string;
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
  isResource: boolean;
  isOffer: boolean;
  isNews: boolean;
}
