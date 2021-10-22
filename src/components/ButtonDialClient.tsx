import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PanToolIcon from '@material-ui/icons/PanTool';
import KitchenIcon from '@material-ui/icons/Kitchen';
import DialogMenu from './DialogMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IModelDrinks, IModelFood } from '../interfaces/IModelMenuItem';
import DialogComponent from './DialogComponent';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'fixed',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
    staticTooltipLabel: {
      width : 150,
    },
  }),
);

 

const actions = [
  { icon: <SaveIcon />, name: 'orderFood', id:'orderFood', action: "Pedir comida" },
];

export default function ButtonDialClient() {
  const classes = useStyles(); 
  const [passwordOrden, setPasswordOrden] = useState("")
  const [textButton, setTextButton] = useState("Pedir autorización")

  const { items } = useSelector((state: RootState) => state.menuItemReducer);


  const renderOrderFood = items.food.filter((x:IModelFood)=> x.quantity > 0).length > 0  || 
  items.drink.filter((x:IModelDrinks)=> x.quantity > 0).length > 0  ? true : false
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const setReducers = () => {
/*     dispatch(setSocketClientMaster(trackingCode))
    dispatch(setTableSeleted(tableModel)) */
}


  const setOpenMenu=()=>{
    setOpenDialog(!openDialog)
  }
  const actionEvent=(action: any)=>{
      setOpenDialog(true)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const printTextButton=(value:string)=>{
    setPasswordOrden(value)
    setTextButton(value !== "" ? "Acctualizar orden":  "Pedir autorización")
 
    }
  
  
  return (
     renderOrderFood ?
    <>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={"up"}
        >
           {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              id={action.id}      
              tooltipTitle={action.action}
              tooltipOpen
              onClick={()=>actionEvent(action)}
            />
          ))} 
        </SpeedDial>

        {openDialog &&
              <DialogComponent
              open={openDialog}
              setOpenMenu={(open) => setOpenDialog(open)}
              dialogContentText="Ingrese contraseña para poder pedir"
              title="Contraseña para orden"
              children={<TextField
                  fullWidth
                  type="text"
                  value={passwordOrden}
                  onChange={(e) => {
                    printTextButton(e.target.value)
                  }
                  } />}
              actionButton={() => setReducers()}
              textActionButton={textButton}
          />
        }
        </> : null
  );
}
