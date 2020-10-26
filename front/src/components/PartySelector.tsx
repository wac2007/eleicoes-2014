import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';

interface Props {
  selected: string;
  partyList: string[];
  onChange?: SelectInputProps['onChange'];
}

const PartySelector = ({ selected, partyList, onChange }: Props) => (
  <FormControl>
    <InputLabel id="demo-simple-select-helper-label">Partido</InputLabel>
    <Select
      value={selected}
      onChange={onChange}
    >
      <MenuItem value="">Nenhum</MenuItem>
      {
          partyList.map((party) => (
            <MenuItem value={party} key={party}>{party}</MenuItem>
          ))
        }
    </Select>
  </FormControl>
);

export default PartySelector;
