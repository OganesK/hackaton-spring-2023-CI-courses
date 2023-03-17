export interface EventPosterProps {
  id: number;
  name: string;
  poster: {
    link: string;
  };
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
