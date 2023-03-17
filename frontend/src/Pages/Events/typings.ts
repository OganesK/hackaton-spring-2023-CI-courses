export interface EventTypes {
  id: number;
  name: string;
  poster: {
    link: string;
  };
  category: string;
  description: string;
  shortDescription: string;
  date: Date;
  organizer: string;
  format?: string;
  theme: string;
  address: string;
  stream?: {
    id: number;
    streamKey: string;
    active: boolean;
  };
  user: {
    publishedEvent: {
      id: number;
    }[];
  };
}
