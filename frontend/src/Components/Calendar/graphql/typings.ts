export interface EventTypes {
  id: number;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  poster: {
    link: string;
  };
  date: Date;
  address: string;
  format?: string;
  theme: string;
  organizer: string;
  stream?: {
    id: number;
    streamKey: string;
    active: boolean;
  };
}

export interface StateType {
  id: number;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  poster: {
    link: string;
  };
  date: Date;
  address: string;
  format?: string;
  theme: string;
  organizer: string;
  stream?: {
    id: number;
    streamKey: string;
    active: boolean;
  };
}

export interface EventCardProps {
  id: number;
  img: {
    link: string;
  };
  title: string;
  content: string;
  shortContent: string;
  date: Date;
  address: string;
  format?: string;
  theme: string;
  organizer: string;
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
    publishedEvent: {
      id: number;
    }[];
  };
  refetch: () => any;
}
