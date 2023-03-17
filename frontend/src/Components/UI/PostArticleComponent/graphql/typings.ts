export interface ArticleProps {
  postId: number;
  isOwner?: boolean;
  isProject?: boolean;
  isCrowdfunding?: boolean;
  // loading?: boolean;
  article?: {
    id: number;
    sections: Section[];
  };
}
export interface Section {
  number: number;
  type: string;
  text?: string;
  media?: {
    link: string;
  };
  mediaURL?: string;
}

export interface ArticleMedia {
  link?: string;
}
