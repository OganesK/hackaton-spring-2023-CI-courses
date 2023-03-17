export interface CompanyTypes {
  id: number;
  name: string;
  avatar: {
    link: string;
  };
  shortDescription: string;
  description: string;
  activityKind: string;
  inn: string;
  mainRegion: string;
  mainContact: string;
}

export interface CompanyEditModalProps {
  open: boolean;
  handleOpenClose: () => void;
  companyId: number;
}
