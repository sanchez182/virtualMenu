import { Grid } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import StartAppBarPublic from '../../components/Layout/StartAppBarPublic';
import { SocketProvider } from '../../context/SocketContext';
import { RootState } from '../../store';
import MenuComponent from './MenuComponent';
import TableScreen from './TableScreen';


const TablesHome: FC = () => {
  //tableList
  const selectedTable = useSelector((state: RootState) => state.selectedTable)
debugger
console.log("Cae dentro de render socket")
  return (
    <Grid container className={"imgFond"}>
      {selectedTable._id ? 
     <SocketProvider>
        <MenuComponent selectedTable={selectedTable} />
     </SocketProvider>
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