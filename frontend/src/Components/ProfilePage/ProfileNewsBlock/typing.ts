export interface ProfileNewsProps {
  id: number;
  publicDate: Date;
  title: string;
  shortDescription: string;
  newsOwnerId: number;
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
  img: string;
  contentId: number;
  isOffer?: boolean;
  isResource?: boolean;
  isNews?: boolean;
  : boolean;
  isOwner: boolean;
  ownerId: number;
  workerId: number;
  firstname: string;
  lastname: string;
  ownerAvatar: string;
  heightTwoElementInGrid?: number;
  isProfilePage?: boolean;
  refetch: () => any;
}
