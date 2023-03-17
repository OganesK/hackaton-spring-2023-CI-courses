import { Dispatch, SetStateAction } from 'react';

export interface MatchProps {
  match: {
    path: string;
    isExact: boolean;
    url: string;
    params: {
      groupId: string;
    };
  };
}

export interface IMessagesPageContext {
  activeGroupId: number;
  setActiveGroupId: Dispatch<SetStateAction<number>>;
}
