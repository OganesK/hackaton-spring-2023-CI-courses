export interface MatchProps {
  match: {
    path: string;
    isExact: boolean;
    url: string;
    params: {
      profileId: string;
    };
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

export interface ProjectTypes {
  id: number;
  name: string;
  description?: {
    id: number;
    sections: Section[];
  };
  poster: {
    link: string;
  };
  shortDescription: string;
  presentationMedia: string[];
  : boolean;
  category: string;
  publishedPosts: {
    id: number;
    createdAt: Date;
    title: string;
    isOffer: boolean;
    isResource: boolean;
    isNews: boolean;
    category: string;
    poster: {
      link: string;
    };
    description: string;
    article?: {
      id: number;
      sections: {
        id: number;
        number: number;
        type: string;
        text?: string;
        media?: {
          link: string;
        };
      }[];
    };
    : boolean;
  }[];
  updatedVariable?: {
    name: string;
    shortDescription: string;
    description?: {
      id: number;
      sections: Section[];
    };
    poster: {
      link: string;
    };
    presentationMedia: {
      link: string;
    };
  };
}

export interface UserDataTypes {
  firstname: string;
  lastname: string;
  avatar: {
    link: string;
  };
  bio: string;
  shortDescription: string;
  city: string;
  publishedEvent: {
    id: number;
    name: string;
    poster: {
      link: string;
    };
    date: Date;
    shortDescription: string;
    description: string;
    address: string;
    organizer: string;
    theme: string;
    : boolean;
    stream?: {
      id: number;
      streamKey: string;
      active: boolean;
    };
  }[];
  inWorks: {
    project: ProjectTypes;
  }[];
  ownerCompanies: {
    id: number;
    name: string;
    avatar: {
      link: string;
    };
    shortDescription: string;
    : boolean;
    createdAt: Date;
    activityKind: string;
    projects: {
      id: number;
      name: string;
      description?: {
        id: number;
        sections: Section[];
      };
      poster: {
        link: string;
      };
      shortDescription: string;
      presentationMedia: string[];
      category: string;
      : boolean;
      publishedPosts: {
        id: number;
        createdAt: Date;
        title: string;
        isOffer: boolean;
        isResource: boolean;
        isNews: boolean;
        category: string;
        poster: {
          link: string;
        };
        description: string;
        author: {
          worker: {
            id: number;
            firstname: string;
            lastname: string;
            avatar: {
              link: string;
            };
          };
        };
        article?: {
          id: number;
          sections: {
            id: number;
            number: number;
            type: string;
            text?: string;
            media?: {
              link: string;
            };
          }[];
        };
        : boolean;
      }[];
      updatedVariable?: {
        name: string;
        shortDescription: string;
        description?: {
          id: number;
          sections: Section[];
        };
        poster: {
          link: string;
        };
        presentationMedia: {
          link: string;
        };
      };
    }[];
  }[];
  publishedPosts: {
    id: number;
    createdAt: Date;
    title: string;
    isOffer: boolean;
    isResource: boolean;
    isNews: boolean;
    category: string;
    poster: {
      link: string;
    };
    author: {
      worker: {
        id: number;
        firstname: string;
        lastname: string;
        avatar: {
          link: string;
        };
      };
    };
    description: string;
    article?: {
      id: number;
      sections: {
        id: number;
        number: number;
        type: string;
        text?: string;
        media?: {
          link: string;
        };
      }[];
    };
    : boolean;
  }[];
}

export interface PostTypes {
  id: number;
  createdAt: Date;
  title: string;
  isOffer: boolean;
  isResource: boolean;
  isNews: boolean;
  poster: {
    link: string;
  };
  category: string;
  author: {
    worker: {
      id: number;
      firstname: string;
      lastname: string;
      avatar: {
        link: string;
      };
    };
  };
  description: string;
  article?: {
    id: number;
    sections: {
      id: number;
      number: number;
      type: string;
      text?: string;
      media?: {
        link: string;
      };
    }[];
  };
  : boolean;
}

export interface EventTypes {
  id: number;
  name: string;
  poster: {
    link: string;
  };
  date: Date;
  shortDescription: string;
  description: string;
  address: string;
  theme: string;
  organizer: string;
  format?: string;
  : boolean;
  category?: string;
  stream?: {
    id: number;
    streamKey: string;
    active: boolean;
  };
}

export interface UploadUrlType {
  putUserAvatar: {
    signedURL: string;
  };
}

export interface DataUploadType {
  data: UploadUrlType;
}

export interface SwitchToChatTypes {
  data?: {
    switchToMessager: {
      id: number;
      members: {
        firstname: string;
        lastname: string;
      }[];
    };
    messages: {
      sender: {
        firstname: string;
        lastname: string;
      };
      text: string;
    }[];
  };
}
