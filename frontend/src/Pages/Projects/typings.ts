export interface ProjectsTypes {
  id: number;
  category: string;
  name: string;
  description?: {
    id: number;
    sections: Section[];
  };
  shortDescription: string;
  presentationMedia: {
    type: string;
    link: string;
  }[];
  poster: {
    link: string;
  };
}

interface Section {
  number: number;
  type: string;
  text?: string;
  media?: {
    link: string;
  };
}
