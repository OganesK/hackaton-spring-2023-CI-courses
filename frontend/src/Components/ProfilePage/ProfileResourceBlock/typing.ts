export interface ProfileResourceProps {
  id: number;
  publicDate: Date;
  title: string;
  category: string;
  shortDescription: string;
  resourceOwnerId: number;
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
  img: string;
  contentId: number;
  isOffer?: boolean;
  isResource?: boolean;
  isNews?: boolean;
  isApproved: boolean;
  isOwner: boolean;
  ownerId: number;
  isProfilePage?: boolean;
  refetch: () => any;
  // loading?: boolean;
  customFirstDefaultHeight?: number;
  customSecondDefaultHeight?: number;
}
