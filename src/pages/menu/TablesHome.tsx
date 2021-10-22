import { Grid } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import StartAppBarPublic from '../../components/Layout/StartAppBarPublic';
import { RootState } from '../../store';
import { ITableModel } from '../../store/actions/actionsInterfaces/ITableActions';
import MenuComponent from './MenuComponent';
import OnlyMenuComponent from './OnlyMenuComponent';
import TableScreen from './TableScreen';


const TablesHome: FC = () => {
  const { selectedTable }: ITableModel = useSelector((state: RootState) => state.dataTables)
  const [onlyMenu, setOnlyMenu] = useState(false)

const renderData =()=>{
  return selectedTable.tableNumber !== 0 ? <MenuComponent selectedTable={selectedTable} />
  :
  <>
    <StartAppBarPublic />
    <TableScreen setOnlyMenu={setOnlyMenu} />
  </>
}
  return (
    <Grid container className={"imgFond"}>
      {
        onlyMenu ?
          <OnlyMenuComponent />
          :
          renderData()
      }

    </Grid>

  );
}

export default React.memo(TablesHome);