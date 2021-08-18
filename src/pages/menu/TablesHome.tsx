import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import StartAppBarPublic from '../../components/Layout/StartAppBarPublic';
import { RootState } from '../../store';
import { ITableModel } from '../../store/actions/actionsInterfaces/ITableActions';
import MenuComponent from './MenuComponent';
import TableScreen from './TableScreen';


const TablesHome: FC = () => {
  const {selectedTable}:ITableModel = useSelector((state: RootState) => state.dataTables)
  return (
    <Grid container className={"imgFond"}>
      {selectedTable._id ? 
        <MenuComponent selectedTable={selectedTable} />
        :
        <>
          <StartAppBarPublic />
          <TableScreen /> 
        </>
       } 
    </Grid>

  );
}

export default React.memo(TablesHome);