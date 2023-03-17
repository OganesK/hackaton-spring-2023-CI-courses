export interface ProfileOfferProps {
  id: number;
  publicDate: Date;
  title: string;
  shortDescription: string;
  img: string;
  offerOwnerId: number;
  firstname: string;
  lastname: string;
  ownerAvatar: string;
  contentId: number;
  isOffer?: boolean;
  isResource?: boolean;
  isNews?: boolean;
  isApproved?: boolean;
  isOwner: boolean;
  ownerId: number;
  isProfilePage?: boolean;
  refetch: () => any;
}
