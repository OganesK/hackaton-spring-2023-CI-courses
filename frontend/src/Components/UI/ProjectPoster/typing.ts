interface AuthorsTypes {
  worker: {
    id: number;
    firstname: string;
    lastname: string;
  };
}

export interface ProjectPosterProps {
  id: number;
  header: string;
  authors: AuthorsTypes[];
  title: string;
  img: string;
}
