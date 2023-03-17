export interface ModalFrameProps {
  open: boolean;
  handleOpenClose: () => void;
  title: string;
  article: string;
  articleWithSections?: {
    id: number;
    sections: {
      number: number;
      type: string;
      text?: string;
      media?: {
        link: string;
      };
    }[];
  };
  media?: string;
  isChanged: boolean;
  isProject?: boolean;
  isPostNews?: boolean;
  isPostResource?: boolean;
  isCrowd?: boolean;
}
