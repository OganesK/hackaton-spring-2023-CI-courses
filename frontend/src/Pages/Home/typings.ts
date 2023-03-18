export interface ConfigTypes {
  totalBudgetInvestment: number;
  totalExtraBudgetInvestment: number;
  totalProjectCount: number;
  totalCompanyCount: number;
  platformTitle: string;
  platformDescription: string;
  platformTagline: string;
  platformShortDescription: string;
  projectsShownOnLanding: {
    id: number;
    name: string;
    shortDescription: string;
    category: string;
    presentationMedia: {
      link: string;
    }[];
    poster: {
      link: string;
    };
    workers: {
      worker: {
        id: number;
        firstname: string;
        lastname: string;
      };
    }[];
  }[];
  newsShownOnLanding: NewsOnLanding[];
  crowdFundingsShownOnLanding: CrowdsOnLanding[];
  offersShownOnLanding: OffersOnLanding[];
}

interface NewsOnLanding {
  title: string;
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
  createdAt: Date;
  poster: {
    link: string;
  };
}

interface CrowdsOnLanding {
  id: number;
  title: string;
  shortDescription: string;
  goalSum: number;
  nowSum: number;
  project: {
    id: number;
    name: string;
    category: string;
    poster: {
      link: string;
    };
  };
  createdAt: Date;
  isApproved: boolean;
  activeCheck: boolean;
}

interface OffersOnLanding {
  id: number;
  title: string;
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
  createdAt: Date;
  poster: {
    link: string;
  };
}
