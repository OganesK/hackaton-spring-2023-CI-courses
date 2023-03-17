export interface AuthorsTypes {
  worker: {
    id: number;
    firstname: string;
    lastname: string;
  };
}

export interface ProjectTypes {
  id: number;
  name: string;
  shortDescription: string;
  category: string;
  poster: {
    link: string;
  };
  presentationMedia: {
    link: string;
  }[];
  workers: Array<AuthorsTypes>;
}

export interface OurProjectsProps {
  projectsShownOnLanding?: Array<ProjectTypes>;
}
