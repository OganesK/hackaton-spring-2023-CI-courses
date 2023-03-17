export interface VerificateEntityInput {
  entityId: number;
  verdict: boolean;
  rejectMessage: string;
}

export interface VerificateMutationInput {
  entityId: number;
  verdict: boolean;
  entityType: string;
  rejectMessage: string;
}
