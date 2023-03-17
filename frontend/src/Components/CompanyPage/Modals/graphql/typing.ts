import { ApolloQueryResult } from '@apollo/client';
import { CompanyTypes } from '../../../../Pages/Company/graphql/typings';

export interface ContactsCreateModalProps {
  open: boolean;
  handleOpenClose: () => void;
  ownerId: number;
  refetch: () => Promise<ApolloQueryResult<{ company: CompanyTypes }>>;
}

export interface EditContactsModalProps {
  open: boolean;
  handleOpenClose: () => void;
  contactId: number;
  refetch: () => Promise<ApolloQueryResult<{ company: CompanyTypes }>>;
}

export interface ContactTypes {
  id: number;
  emails: string[];
  adresses: string[];
  phones: string[];
  ownerCompany: {
    id: number;
  };
}
