export interface TestTypes {
  id: number;
  name: string;
}

interface Section {
  number: number;
  type: string;
  text?: string;
  media?: {
    link: string;
  };
}
