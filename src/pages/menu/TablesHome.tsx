import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import StartAppBarPublic from '../../components/Layout/StartAppBarPublic';
import { RootState } from '../../store';
import MenuComponent from './MenuComponent';
import TableScreen from './TableScreen';


const TablesHome: FC = () => {
  const selectedTable = useSelector((state: RootState) => state.selectedTable)
  return (
    <Grid container className={"imgFond"}>
      {selectedTable._id ? 
        <MenuComponent selectedTable={selectedTable} />
        :
        <>
          <StartAppBarPublic />
          <TableScreen setSelectedTable={()=>{}} /> 
        </>
       } 
    </Grid>

  );
}

export default React.memo(TablesHome);