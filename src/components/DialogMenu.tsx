import React, { useContext, useEffect } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { IModelDrinks, IModelFood } from '../interfaces/IModelMenuItem';
import { Card, CardContent, CardHeader, DialogContentText, TextField } from '@material-ui/core';
import { SocketContext } from '../context/SocketContext';
import { useState } from 'react';
import { createOrUpdateOrder } from '../actionsApi/orderActions';
import { setOrder, updateOrderStatus } from '../store/actions/ordersActions';
import { IOrder } from '../store/actions/actionsInterfaces/IOrdersActions';
import DialogComponent from './DialogComponent';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface IDialogMenu {
  open: boolean;
  setOpenMenu: () => void;
  tableNumber: number;
}
const DialogMenu = ({ open, setOpenMenu, tableNumber }: IDialogMenu) => {
  const { items } = useSelector((state: RootState) => state.menuItemReducer);
  const renderFood = items.food.filter((x: IModelFood) => x.cant > 0)
  const renderDrink = items.drink.filter((x: IModelDrinks) => x.cant > 0)
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const order: IOrder = useSelector((state: RootState) => state.orderData);
  const { socketClientId } = useSelector((state: RootState) => state.socketClient);
  const { _id } = useSelector((state: RootState) => state.restaurantData);

  const [extraInfo, setOpenExtraInfo] = useState({
    showDialog: false,
    message: ""
  })
  useEffect(() => {
    setOpenExtraInfo({ ...extraInfo, message: order.extraInfo })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ordenFood = () => {
    debugger
    const itemsFood: any[] = []
    renderFood.forEach(item => {
      itemsFood.push({
        plate: item._id,
        quantity: item.cant
      })
    })

    const itemsDrink: any[] = []
    renderDrink.forEach(item => {
      itemsDrink.push({
        drink: item._id,
        quantity: item.cant
      })
    })

    createOrUpdateOrder({
      _id: order._id,
      state: 1,
      idRestaurant: _id,
      extraInfo: extraInfo.message,
      tableNumber,
      clientId: socketClientId,
      itemsOrder: {
        itemsFood, // mesa seleccionada
        itemsDrink
      }
    }).then((order: IOrder) => {
      socket.emit('set-order-food', order);
      setOpenExtraInfo({ ...extraInfo, showDialog: false })
      dispatch(setOrder(order))
    })

  }

  React.useEffect(() => {
    socket?.on('change-status-order-client', (order: IOrder) => {
      debugger
      dispatch(updateOrderStatus(order.state))
    })
  }, [_id, dispatch, socket]);

  return (
    <>
      <Dialog fullWidth onClose={setOpenMenu} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={setOpenMenu}>
          Listado de productos seleccionados
        </DialogTitle>
        <DialogContent dividers>
          {order.state && <h4>Estado : {order.state === 1 ? "Enviada" : (order.state === 3 ? "Orden en proceso" : "Sin enviar")}</h4>}
          <h4>Platillos</h4>
          {renderFood.length > 0 ? renderFood.map((item: IModelFood) => {
            return <Card>
              <CardHeader
                title={<div>{item.plateName} <p style={{ float: "right" }}> Cant.{item.cant}</p></div>}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          }) :
            <Typography variant="body2" color="textSecondary" component="p">
              Aún no has seleccionado ningún platillo para pedir.
            </Typography>

          }
          <br />
          <br />
          <br />
          <h4>Bebidas</h4>
          {renderDrink.length > 0 ? renderDrink.map((item: IModelDrinks) => {
            return <Card>
              <CardHeader
                title={`${item.drinkName}   Cant.${item.cant}`}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          })
            :
            <Typography variant="body2" color="textSecondary" component="p">
              Aún no has seleccionado ninguna bebida para pedir.
            </Typography>
          }

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenExtraInfo({ ...extraInfo, showDialog: true })} color="primary">
            Enviar orden
          </Button>
        </DialogActions>
      </Dialog>

      <DialogComponent
        open={extraInfo.showDialog}
        setOpenMenu={(open) => setOpenExtraInfo({ ...extraInfo, showDialog: open })}
        dialogContentText="¿Desea agregar comentarios adicionales sobre su pedido?"
        title="Comentarios adicionales"
        children={<TextField
          fullWidth
          type="text"
          value={extraInfo.message}
          onChange={(e) => setOpenExtraInfo({ ...extraInfo, message: e.target.value })}
          multiline={true}
          maxRows={4} />}
        actionButton={ordenFood}
        textActionButton="Realizar pedido"
      />
    </>
  );
}

export default DialogMenu;
