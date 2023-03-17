export interface ModalProps {
  id: number;
  title: string;
  img: string;
  article?: {
    id: number;
    sections: Section[];
  };
  date: string;
  onImage: boolean;
  isCancel?: boolean;
  isNewNotApprovedArticle?: boolean;
  isEvent?: boolean;
  eventAddress?: string;
  eventTheme?: string;
  eventFormat?: string;
  eventOrganizer?: string;
  isOwner?: boolean;
  ownerId: number;
  firstname: string;
  lastname: string;
  ownerAvatar: string;
  open: boolean;
  handleOpenClose: () => void;
  // loading?: boolean;
  // refetch?: () => any;
}
interface Section {
  number: number;
  type: string;
  text?: string;
  media?: {
    link: string;
  };
}
