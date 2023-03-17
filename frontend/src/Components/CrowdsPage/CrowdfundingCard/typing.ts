export interface CrowdfundingCardProps {
  id: number;
  title: string;
  shortDescription: string;
  goalSum: number;
  nowSum: number;
  projectProps: {
    id: number;
    name: string;
    category: string;
    poster: {
      link: string;
    };
  };
  activeCheck: boolean;
}
