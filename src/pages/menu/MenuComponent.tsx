import React, { useContext, useEffect } from 'react';
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
import { SocketContext } from '../../context/SocketContext';
import { Card } from '@material-ui/core';
import { getAllDrinks } from '../../actionsApi/drinkActions';
import { setMenuItems } from '../../store/actions/menuItemsActions';
import { getAllPlates } from '../../actionsApi/plateActions';

//#region  styles
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
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
  selectedTable: number
}

export default function MenuComponent({ selectedTable }: IMenuProps) {
  //TODO: por param llega el numero de mesa
  const { items } = useSelector((state: RootState) => state.menuItemReducer);
  const { foodTimeList, foodTypeList,drinkTypeList } = useSelector((state: RootState) => state.restaurantData);
  const [value, setValue] = React.useState(0);
  const [drinkType, setDrinkType] =React.useState<IDrinkType[]>([]);
  const [foodType, setFoodType] = React.useState<IFoodType[]>([]);
  const [foodTime, setFoodTime] = React.useState<ITimeFood[]>([]);
  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      Promise.all([getAllDrinks(), getAllPlates()]).then(values => {
        const [drinks, plates] = values
        items.drink = drinks
        items.food = plates
        dispatch(setMenuItems(items))
      }).catch(error => {
        debugger;  
      });
    }
    fetchData();
  }, [dispatch, items])

  /*   useEffect(() => {
      // TODO: emitir la mesa que se aparta para mostrarlo en el lado del administrador y a los otros clientes
      socket.emit('selected-table', {
        tableNumber: selectedTable, // mesa seleccionada
        idRestaurant: _id,
        isSelected: true
      });
    }, [socket, selectedTable, _id]) */

  const setDrink = (value: any) => {
    setDrinkType(value as IDrinkType[])
  }

  const setTimeFood = (value: any) => {
    setFoodTime(value as ITimeFood[]);

  };

  const setFood = (value: any) => {
    setFoodType(value as IFoodType[]);

  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const renderFoodByFilters = () => {
    debugger
    if (foodTime.length > 0 && foodType.length > 0) {
      let newFoodList: IModelFood[] = []
      let newFoodList2: IModelFood[] = []

      items.food.forEach(item => {
        foodTime.forEach(time => {
          if (item._id === time.idTimeFood)
            newFoodList.push(item)
        });
      });

      newFoodList.forEach(item => {
        foodType.forEach(time => {
          if (item._id === time.idFoodType)
            newFoodList2.push(item)
        });
      });

      return newFoodList2.map((item: IModelFood) => {
        return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item._id} />
      })

    } else
      if (foodTime.length > 0) {
        return foodTime.map((foodTime) => {
          return items.food.filter((x: IModelFood) => x.foodTime === foodTime.timeFoodName).map((item: IModelFood) => {
            return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item._id} />
          })
        })
      } else

        if (foodType.length > 0) {
          return foodType.map((foodType) => {
            return items.food.filter((x: IModelFood) => x.foodTime === foodType.foodName).map((item: IModelFood) => {
              return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item._id} />
            })
          })
        } else {
          return items.food.map((item: IModelFood) => {
            return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item._id} />
          })
        }
  }

  return (
    <>

      <AppBar position='fixed'>
        <Tabs centered style={{width:"100%"}} value={value} onChange={handleChange} aria-label="restaurant-virtual-menu">
          <Tab label="Platillos" icon={<LocalDiningIcon />} {...a11yProps(0)} />
          <Tab label="Bebidas" icon={<LocalBarIcon />} {...a11yProps(1)} />
          <Tab label="Ofertas/Combos" icon={<FastfoodIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
        <Grid container justifyContent="center" style={{ flex: "inline-table" }}>
          <Grid item xs={12} md={12} style={{ marginTop: "48px" }} >
            <Card style={{ marginTop: "48px" }}>
              <MultiSelect renderItems={foodTime}
                items={foodTimeList}
                setItemValue={setTimeFood}
                itemName="foodTimeName"
                placeHolder="Filtrar por tiempo de comida" />

              <MultiSelect renderItems={foodType}
                items={foodTypeList}
                setItemValue={setFood}
                itemName="foodTypeName"
                placeHolder="Filtrar por tipo de comida" />
            </Card>

          </Grid>
          
          {renderFoodByFilters()}
        </Grid>

      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container justifyContent="center" style={{ flex: "inline-table" }}>
          <Grid item xs={12} md={12} style={{ marginTop: "48px" }} >
          <Card style={{ marginTop: "48px" }}>
              <MultiSelect renderItems={drinkType}
                items={drinkTypeList}
                setItemValue={setDrink}
                itemName="drinkTypeName"
                placeHolder="Filtrar por tipo de bebida" /> 
            </Card>
          </Grid>  {
          items.drink.length > 0 && items.drink.map((item: IModelDrinks) => {
            return <MenuItems item={item} itemType="drink" key={item._id}
              itemName={item.drinkName} />
          })
          /*     :
              items.drink.filter((x: IModelDrinks) => x.idDrinkType === drinkType).map((item: IModelDrinks) => {
                return <MenuItems item={item} itemType="drink" key={item._id}
                  itemName={item.drinkName} />
              }) */
        }
        </Grid>
      
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <ButtonDial tableNumber={selectedTable} />
    </>
  );
}

