export interface CrowdfundsTypes {
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
  isApproved: boolean;
  activeCheck: boolean;
}
