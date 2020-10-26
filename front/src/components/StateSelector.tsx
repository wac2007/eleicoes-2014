import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { StateResponse } from '../libs/ibgeClient';

interface Props {
  selected: number;
  stateList: StateResponse[];
  onChange?: SelectInputProps['onChange'];
}

const StateSelector = ({ selected, stateList, onChange }: Props) => (
  <FormControl>
    <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
    <Select
      value={selected}
      onChange={onChange}
      disabled
    >
      <MenuItem value={-1}>Indisponível</MenuItem>
      {
          stateList.map((state) => (
            <MenuItem value={state.id} key={state.id}>{state.nome}</MenuItem>
          ))
        }
    </Select>
  </FormControl>
);

export default StateSelector;
