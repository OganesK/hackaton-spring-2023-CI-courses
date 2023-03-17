import { Dispatch } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import { EventTypes } from '../../../Pages/Events/typings';

export interface ModalFrameProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
  Background: string;
  title: string;
  content: string;
}

export interface ShownFullscreenPostContentProps {
  id: number;
  title: string;
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
  open: boolean;
  handleOpenClose: () => void;
}

export interface ShownModalContentProps {
  id: number;
  header: string;
  img?: string;
  article: string;
  date?: string;
  onImage: boolean;
  isCancel?: boolean;
  isNewNotApprovedArticle?: boolean;
  isEvent?: boolean;
  eventAddress?: string;
  eventTheme?: string;
  eventFormat?: string;
  eventOrganizer?: string;
  isOwner?: boolean;
}

export interface ShownModalEventContentProps {
  id: number;
  header: string;
  img: string;
  article: string;
  date: Date;
  time: string;
  onImage: boolean;
  isCancel?: boolean;
  isNewNotApprovedArticle?: boolean;
  isEvent?: boolean;
  eventAddress?: string;
  eventTheme?: string;
  eventFormat?: string;
  eventOrganizer?: string;
  isOwner?: boolean;
  open: boolean;
  handleOpenClose: () => void;
  stream?: {
    id: number;
    streamKey: string;
    active: boolean;
  };
  user?: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  };
  refetch: () => any;
  // refetch: () => Promise<ApolloQueryResult<{ event: EventTypes }>>;
}
