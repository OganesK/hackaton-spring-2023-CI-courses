export interface CreateProjectMutationTypes {
  id: number;
}

export interface ContactTypes {
  isOwner: boolean;
  emails: string[];
  phones: string[];
  addresses: string[];
  isApproved: boolean;
}
