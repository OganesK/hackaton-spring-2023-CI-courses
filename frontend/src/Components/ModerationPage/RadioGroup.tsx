import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { TypeRadioGroupProps } from './typings';

export default function TypeRadioGroup(props: TypeRadioGroupProps): JSX.Element {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Выберите тип модерации</FormLabel>
      <RadioGroup
        value={props.value}
        defaultValue="created"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => props.setValue(e.target.value)}
        row
        aria-label="тип"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="created" control={<Radio />} label="Созданные" />
        <FormControlLabel value="updated" control={<Radio />} label="Измененные" />
      </RadioGroup>
    </FormControl>
  );
}
