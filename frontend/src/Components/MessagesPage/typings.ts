import { ApolloQueryResult, OperationVariables } from '@apollo/client';

export interface MessagesBlockProps {
  messages: IMessage[];
}

export interface GroupInfoProps {
  group: IMyGroup;
  refetchGroupData: (variables?: Partial<OperationVariables> | undefined) => Promise<
    ApolloQueryResult<{
      getMessageInGroup: IMyGroup;
    }>
  >;
  isChatStarted: boolean;
  isChatActive: boolean;
  handleJoinRoom: () => void;
  handleLeaveRoom: () => void;
}

export interface GroupItemProps {
  group: IMyGroup;
}

export type GroupType = 'public' | 'private';

export interface IGroupMember {
  id: number;
  firstname: string;
  lastname: string;
  avatar?: {
    link: string;
  };
  role: string;
}

export interface IMessage {
  id: number;
  text: string;
  createdAt: Date;
  sender: {
    id: number;
    firstname: string;
    lastname: string;
    avatar?: {
      link: string;
    };
  };
}
export interface IMyGroup {
  id: number;
  admins: {
    id: number;
  }[];
  title: string;
  avatar?: {
    id: number;
    link: string;
  };
  type: GroupType;
  members: IGroupMember[];
  messages: IMessage[];
  inviteURL: string;
}
