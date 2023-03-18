import React, { useContext, useState, useEffect } from 'react';

import { Grid, TextField, Autocomplete } from '@mui/material';

import { AutoCompleteSearchFieldPropsType } from './typings';
import { userContext } from '../../../Context/context';

export default function AutoCompleteSearchField(props: AutoCompleteSearchFieldPropsType): JSX.Element {
  const [filteredData, setFilteredData] = useState<any>(['']);
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const contextUserData = useContext(userContext);
  useEffect(() => {
  }, []);

  return (
    <Grid container xs direction="row" justifyContent="space-between" style={{ gap: 20 }}>
      <Grid container xs={12}>
        <Autocomplete
          disablePortal
          noOptionsText="Нет курсов"

          id="controllable-states-demo"
          // options={filteredData && filteredData.length > 0 && filteredData.map((data: string) => data.split('.')[1])}
          options={top100Films} //ЕБАНУТЬ БЛЯТЬ ТУТ КУРСЫ ПО ЗАПРОСУ
          //           onChange={(event, newValue: string | null): void => {
          //   props.setValue(filteredData);
          // }}
          // value={props.value?.split('.')[1]} //Разделение строку короче! Пизда!
          // onChange={(event, newValue: string | null): void => {
          //   props.setValue(filteredData.filter((data: any) => data.split('.')[1] === newValue)[0].split('.')[1]);
          // }}
          sx={{ width: '100%' }}
          renderInput={(params): JSX.Element => <TextField {...params} label="Ваши курсы" />}
          size="small"
        />
      </Grid>
    </Grid>
  );
}
