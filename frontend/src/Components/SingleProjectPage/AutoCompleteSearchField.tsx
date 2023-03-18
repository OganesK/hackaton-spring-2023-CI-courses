import React, { useEffect, useState } from 'react';

import { Grid, TextField, Button, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useQuery } from '@apollo/client';

import Loading from '../UI/Loading/Loading';
import NoneClick from '../UI/NoneClickableField/NoneClick';
import SnackbarOnChange from '../UI/Snackbar/Snackbar';

import { GET_USERS_QUERY } from './graphql/query';
import { CreateNewWorkerMutation } from './graphql/mutations';
import { UserTypes, AutoCompleteTypes, UserDataQueryTypes } from './typings';

export default function AutoCompleteSearchField(props: AutoCompleteTypes): JSX.Element {
  const workerCreationHandler = CreateNewWorkerMutation();
  const [filteredData, setFilteredData] = useState<string[]>(['']);
  const { data, loading } = useQuery<UserDataQueryTypes>(GET_USERS_QUERY);
  const [value, setValue] = useState<string | null>(filteredData && filteredData[0]);
  const [role, setRole] = useState('');

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const addWorkerHandler: () => Promise<void> = async () => {
    if (value && role) {
      setOpenNoneClick(true);
      const newWorkerData = {
        project: {
          connect: {
            id: props.projectId,
          },
        },
        position: role,
        worker: {
          connect: {
            id: Number(data?.users.filter(user => user.firstname + ' ' + user.lastname === value)[0].id),
          },
        },
      };
      await workerCreationHandler(newWorkerData);
      await props.refetch();
      setOpenNoneClick(false);
    } else {
      setOpenSnack(true);
      setTimeout(() => setOpenSnack(false), 4000);
    }
  };

  useEffect(() => {
    if (!loading) {
      const filtered =
        data &&
        data.users.reduce((acc: string[], user: UserTypes) => {
          if (user.inWorks.filter(work => work.project.id === props.projectId).length === 0)
            acc.push(user.id.toString() + '.' + user.firstname + ' ' + user.lastname);
          return acc;
        }, []);
      setFilteredData(filtered ? filtered : []);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container xs direction="row" justifyContent="space-between" style={{ gap: 20 }}>
      {openNoneClick ? <NoneClick /> : null}

      <Grid container xs={12}>
        <Autocomplete
          disablePortal
          noOptionsText={loading ? 'Загрузка' : 'Нет пользователей'}
          value={value?.split('.')[1]}
          onChange={(event, newValue: string | null): void => {
            setValue(filteredData.filter(data => data.split('.')[1] === newValue)[0].split('.')[1]);
          }}
          id="controllable-states-demo"
          options={filteredData && filteredData.map(data => data.split('.')[1])}
          sx={{ width: '100%' }}
          renderInput={(params): JSX.Element => <TextField {...params} label="Добавить участника" />}
          size="small"
        />
      </Grid>
      {value ? (
        <Grid container xs={12} direction="row" justifyContent="space-between" style={{ gap: 20 }}>
          <Grid container xs>
            <TextField
              value={role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
              id="outlined-basic"
              label="Роль в курсе"
              variant="outlined"
              size="small"
              inputProps={{
                maxLength: 32,
              }}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid style={{ color: '#AAADB2' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={addWorkerHandler}
              startIcon={<AddIcon />}
              sx={{
                height: '100%',
              }}
            >
              Добавить участника
            </Button>
          </Grid>
        </Grid>
      ) : null}
      <SnackbarOnChange
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        isError
        textInSnack="Укажите роль участника"
      />
    </Grid>
  );
}
