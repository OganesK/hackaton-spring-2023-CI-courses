import React, { useContext, useState, useEffect } from 'react';

import { Grid, TextField, Autocomplete } from '@mui/material';

import { AutoCompleteSearchFieldPropsType } from './typings';
import { userContext } from '../../../Context/context';

export default function AutoCompleteSearchField(props: AutoCompleteSearchFieldPropsType): JSX.Element {
  const [filteredData, setFilteredData] = useState<string[]>(['']);

  const contextUserData = useContext(userContext);
  useEffect(() => {
    const ownerProjects =
      contextUserData &&
      contextUserData.user.ownerCompanies.reduce((acc: string[], company) => {
        if (company) {
          company.projects.map(project => {
            acc.push(project.id.toString() + '.' + project.name);
          });
        }
        return acc;
      }, []);

    setFilteredData(ownerProjects);
  }, []);

  return (
    <Grid container xs direction="row" justifyContent="space-between" style={{ gap: 20 }}>
      <Grid container xs={12}>
        <Autocomplete
          disablePortal
          noOptionsText="Нет проектов"
          value={props.value?.split('.')[1]}
          onChange={(event, newValue: string | null): void => {
            props.setValue(filteredData.filter(data => data.split('.')[1] === newValue)[0].split('.')[1]);
          }}
          id="controllable-states-demo"
          options={filteredData && filteredData.map(data => data.split('.')[1])}
          sx={{ width: '100%' }}
          renderInput={(params): JSX.Element => <TextField {...params} label="Ваши проекты" />}
          size="small"
        />
      </Grid>
    </Grid>
  );
}
