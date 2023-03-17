import { DocumentNode, LazyQueryHookOptions, useLazyQuery } from '@apollo/client';
import { Autocomplete, Grid, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../Context/context';
import { IGroupMember } from './typings';

interface UsersInputProps {
  users: IGroupMember[];
  setUsers: React.Dispatch<React.SetStateAction<IGroupMember[]>>;
  QUERY: DocumentNode;
  QUERY_OPTIONS?: LazyQueryHookOptions;
}

function getUserFullName(user: IGroupMember): string {
  return `${user.firstname} ${user.lastname}`;
}
interface IResponse {
  getUsersWhichCanAddToGroup?: IGroupMember[];
  users?: IGroupMember[];
}

const UsersAddToGroupInput: React.FC<UsersInputProps> = ({ users, setUsers, QUERY, QUERY_OPTIONS }) => {
  const Context = useContext(userContext);

  const [loadOptionUsers, { data, called }] = useLazyQuery<IResponse>(QUERY, QUERY_OPTIONS);
  const [optionUsers, setOptionUsers] = React.useState<IGroupMember[]>([]);

  useEffect(() => {
    if (!data) return;
    if (data?.getUsersWhichCanAddToGroup)
      setOptionUsers(data.getUsersWhichCanAddToGroup.filter(user => user.id !== Context.user.id));
    else if (data?.users) setOptionUsers(data.users.filter(user => user.id !== Context.user.id));
  }, [data]);

  const [isFetchingOptionUsers, setIsFetchingOptionUsers] = useState(true);
  const handleFetchUsers = async (): Promise<void> => {
    if (!called) {
      await loadOptionUsers().catch(err => console.log(err));
      setIsFetchingOptionUsers(false);
    }
  };

  const handleUserChange = (newUsers: IGroupMember[]): void => {
    setUsers(newUsers);
  };

  return (
    <Grid container onClick={handleFetchUsers}>
      <Autocomplete
        multiple
        noOptionsText={isFetchingOptionUsers ? 'Загрузка' : 'Нет пользователей'}
        value={users}
        options={optionUsers}
        onChange={(event: React.SyntheticEvent<Element, Event>, newUsers: IGroupMember[]): void => {
          handleUserChange(newUsers);
        }}
        getOptionLabel={user => getUserFullName(user)}
        renderInput={params => <TextField {...params} variant="outlined" placeholder="Добавить участников" />}
        sx={{ width: '100%' }}
      />
    </Grid>
  );
};
export default UsersAddToGroupInput;
