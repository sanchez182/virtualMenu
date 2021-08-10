import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
interface ISelectItem {
    renderItems: any[];
    setItemValue: (arg0: any) => void;
    items: any[];
    itemName: string;
    placeHolder: string;
}
export default function MultiSelect({ setItemValue, renderItems, items, itemName, placeHolder }: ISelectItem) {
    return (

        <Autocomplete
        style={{margin:"12px 12px 12px 12px"}}
        multiple  
        id={itemName}
        options={items} 
        disableCloseOnSelect
        onChange={(event, value) => setItemValue(value)}
        getOptionLabel={(option) => option[itemName]}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox  
              key={option[itemName]}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option[itemName]}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={placeHolder}  />
        )}
      />

    );
}


