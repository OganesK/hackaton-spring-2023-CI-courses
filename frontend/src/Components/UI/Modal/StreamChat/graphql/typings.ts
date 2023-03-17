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

export interface MessagesBlockProps {
  messages: IMessage[];
}
