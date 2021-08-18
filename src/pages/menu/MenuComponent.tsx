import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { RootState } from '../../store';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import MenuItems from './MenuItems';
import ButtonDial from '../../components/ButtonDial';
import { useDispatch, useSelector } from 'react-redux';
import { IDrinkType, IFoodType, IModelDrinks, IModelFood, ITimeFood } from '../../interfaces/IModelMenuItem';
import { Grid } from '@material-ui/core';
import MultiSelect from '../../components/MultiSelect';
import { Card } from '@material-ui/core';
import { getAllDrinks } from '../../actionsApi/drinkActions';
import { setMenuItems } from '../../store/actions/menuItemsActions';
import { getAllPlates } from '../../actionsApi/plateActions';
import { useTranslation } from 'react-i18next';
import ChangeLenguage from '../../components/ChangeLenguage';
import { ITable } from '../../components/Tables';
import { masterIdEqualToClientId } from '../../helpers/checkSocketsId';
import DialogComponent from '../../components/DialogComponent';
import { getAndUpdateOrderBySocketClientId } from '../../actionsApi/orderActions';
import { IOrder } from '../../store/actions/actionsInterfaces/IOrdersActions';
import { SocketContext } from '../../context/SocketContext';

//#region  styles
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  className: string;
}


function TabPanel(props: TabPanelProps) {
  const { children, className, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className={className}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//#endregion


interface IMenuProps {
  selectedTable: ITable
}

export default function MenuComponent({ selectedTable }: IMenuProps) {
  const { t } = useTranslation()
  //TODO: por param llega el numero de mesa
  const { items } = useSelector((state: RootState) => state.menuItemReducer);
  const { foodTimeList, _id, foodTypeList, drinkTypeList } = useSelector((state: RootState) => state.restaurantData);
  const { socketClientId, socketIdMaster } = useSelector((state: RootState) => state.socketClient);
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = useState(true)

  const { socket } = useContext(SocketContext);
  const [drinkType, setDrinkType] = React.useState<IDrinkType[]>([]);
  const [foodType, setFoodType] = React.useState<IFoodType[]>([]);
  const [foodTime, setFoodTime] = React.useState<ITimeFood[]>([]);

  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      Promise.all([getAllDrinks(), getAllPlates()]).then(values => {
        const [drinks, plates] = values
        items.drink = drinks
        items.food = plates
        debugger
        if(localStorage.getItem("oldSocketClientId")=== socketIdMaster){
          //traiga la data y  
          getAndUpdateOrderBySocketClientId(localStorage.getItem("oldSocketClientId"), socketClientId).then((order:IOrder)=>{
              order.itemsOrder.itemsFood.length > 0 && order.itemsOrder.itemsFood.forEach((food:any)=>{
                  const index = items.food.findIndex((x: any) => x._id === food.plate._id )
                  items.food[index].quantity = food.quantity
              })
              order.itemsOrder.itemsDrink.length > 0 && order.itemsOrder.itemsFood.forEach((element:any)=>{
                  const index = items.drink.findIndex((x: any) => x._id === element.drink._id )
                  items.drink[index].quantity = element.quantity
              })
              socket?.emit('change-client-id-order', {
                order: {_id: order._id,clientId: socketClientId}, 
                uidClient: _id,
            });
              dispatch(setMenuItems(items));
              //actualice el idsocket de la orden 
          })

      }else{
            
        dispatch(setMenuItems(items));
      }

      }).catch(error => {
      });
    }
    fetchData();
  }, [dispatch, items, socketClientId, socketIdMaster])

  const setDrink = (value: any) => {
    setDrinkType(value as IDrinkType[])
  }

  const setTimeFood = (value: any) => {
    setFoodTime(value as ITimeFood[]);

  };

  const setFood = (value: any) => {
    setFoodType(value as IFoodType[]);

  };

  const withoutData = () => {
    return <Grid item xs={12} md={12} >
      <Card style={{ marginTop: "48px" }}>
        <h3> Sin resultados</h3>
      </Card>
    </Grid>
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const renderFoodByFilters = () => {
    if (foodTime.length > 0 && foodType.length > 0) {
      let newFoodList: IModelFood[] = []
      let newFoodList2: IModelFood[] = []

      items.food.forEach(item => {
        foodTime.forEach(time => {
          if (item.foodTime === time.foodTimeName)
            newFoodList.push(item)
        });
      });

      newFoodList.forEach(item => {
        foodType.forEach(time => {
          if (item.foodType === time.foodTypeName)
            newFoodList2.push(item)
        });
      });

      return newFoodList2.length > 0 ? newFoodList2.map((item: IModelFood) => {
        return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item._id} />
      }) : withoutData()

    } else
      if (foodTime.length > 0) {
        let data: JSX.Element[] = [];
        foodTime.forEach((foodTime) => {
          items.food.filter((x: IModelFood) => x.foodTime === foodTime.foodTimeName).forEach((item: IModelFood) => {
            data.push(<MenuItems item={item} itemType="food" itemName={item.plateName} key={item._id} />)
          })
        })
        return renderItems(data)
      } else
        if (foodType.length > 0) {
          let data: JSX.Element[] = [];
          foodType.forEach((foodType) => {
            items.food.filter((x: IModelFood) => x.foodType === foodType.foodTypeName).forEach((item: IModelFood) => {
              data.push(<MenuItems item={item} itemType="food" itemName={item.plateName} key={item._id} />)
            })
          })
          return renderItems(data)
        } else {
          return items.food.map((item: IModelFood) => {
            return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item._id} />
          })
        }
  }

  const renderDrinksByFilter = () => {
    if (drinkType.length > 0) {
      let data: JSX.Element[] = [];
      drinkType.forEach((drinkType) => {
        items.drink.filter((x: IModelDrinks) => x.drinkType === drinkType.drinkTypeName).forEach((item: IModelDrinks) => {
          data.push(<MenuItems item={item} itemType="drink" itemName={item.drinkName} key={item._id} />)
        })
      })
      return renderItems(data)
    } else {
      return items.drink.map((item: IModelDrinks) => {
        return <MenuItems item={item} itemType="drink" itemName={item.drinkName} key={item._id} />
      })
    }
  }

  const renderItems = (data: JSX.Element[]) => {
    return data.length > 0 ? data.map(item => {
      return item
    }) : withoutData()
  }

  return (
    <>
      <AppBar position='fixed'>
        <Tabs centered value={value} onChange={handleChange} aria-label="restaurant-virtual-menu">
          <Tab label={t("dishes")} icon={<LocalDiningIcon />} {...a11yProps(0)} />
          <Tab label={t("drinks")} icon={<LocalBarIcon />} {...a11yProps(1)} />
          <Tab label="Ofertas/Combos" icon={<FastfoodIcon />} {...a11yProps(2)} />
          <Tab label={`${t("table")} #${selectedTable.tableNumber}`} disabled style={{ color: "yellow", fontSize: "20px" }} />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className="tapPanelFullWidth" >
        <Grid container style={{ marginTop: "48px" }}>
          <Grid item xs={12} md={12} >

            <ChangeLenguage />
            <Card style={{ marginTop: "48px" }}>
              <MultiSelect renderItems={foodTime}
                items={foodTimeList}
                setItemValue={setTimeFood}
                itemName="foodTimeName"
                placeHolder={t("filterByFoodTime")} />

              <MultiSelect renderItems={foodType}
                items={foodTypeList}
                setItemValue={setFood}
                itemName="foodTypeName"
                placeHolder={t("filterByFoodType")} />
            </Card>
          </Grid>
          {renderFoodByFilters()}
        </Grid>

      </TabPanel>

      <TabPanel value={value} index={1} className="tapPanelFullWidth">
        <Grid container justifyContent="center" style={{ marginTop: "48px" }}>
          <Grid item xs={12} md={12}>
            <Card style={{ marginTop: "48px" }}>
              <MultiSelect renderItems={drinkType}
                items={drinkTypeList}
                setItemValue={setDrink}
                itemName="drinkTypeName"
                placeHolder={t("filterByDrinkType")} />
            </Card>
          </Grid>  {renderDrinksByFilter()}
        </Grid>

      </TabPanel>
      <TabPanel value={value} index={2} className="tapPanelFullWidth">
        Item Three
      </TabPanel>
      {(!socketIdMaster || masterIdEqualToClientId(socketIdMaster, localStorage.getItem("oldSocketClientId"))) &&
        <>
          <ButtonDial tableNumber={selectedTable.tableNumber} />
          <DialogComponent
            open={openDialog}
            setOpenMenu={(open) => setOpenDialog(open)}
            dialogContentText= {`Guarde el siguiente código, servirá para revisar el estado de su orden y compartir el menú con sus acompañantes`}
            title="Código de mesa para compartir"
            children={<h3>{socketIdMaster ? socketIdMaster : socketClientId}</h3>}
            actionButton={()=>setOpenDialog(false)}
            textActionButton="Aceptar"
          />
        </>
      }


    </>
  );
}

