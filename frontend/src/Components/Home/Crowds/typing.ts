export interface CrowdsTypes {
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

export interface CrowdsProps {
  crowdsOnLanding?: Array<CrowdsTypes>;
}
