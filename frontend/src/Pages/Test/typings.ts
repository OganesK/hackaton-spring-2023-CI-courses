export interface TestTypes {
  id: number;
  name: string;
  description: string;
  poster: {
    link: string
  }
}

interface Section {
  number: number;
  type: string;
  text?: string;
  media?: {
    link: string;
  };
}
