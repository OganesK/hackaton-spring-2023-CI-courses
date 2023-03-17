export interface CrowdfundingTypes {
  id: number;
  createdAt: Date;
  title: string;
  shortDescription: string;
  poster: {
    link: string;
  };
  start: Date;
  end: Date;
  goalSum: number;
  nowSum: number;
  activeCheck: boolean;
}

interface Tariff {
  id: number;
  title: string;
  price: number;
  buyerCount: number;
  description: string;
}

export interface TariffTypes {
  id: number;
  tariffs: Tariff;
}

export interface CrowdfundingEditModalProps {
  open: boolean;
  handleOpenClose: () => void;
  crowdId: number;
}

export interface TariffEditModalProps {
  open: boolean;
  handleOpenClose: () => void;
  crowdId: number;
  tariffId: number;
  title: string;
  description: string;
  price: number;
}
