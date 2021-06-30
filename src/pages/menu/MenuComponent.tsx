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
import SelectItem from '../../components/SelectItem';
import { useSelector } from 'react-redux';
import { IFoodType, IModelDrinks, IModelFood, ITimeFood } from '../../interfaces/IModelMenuItem';
import { Grid } from '@material-ui/core';
import { drinkTypeList, foodTypeList, timeFoodTypeList } from '../temporalData';
import MultiSelect from '../../components/MultiSelect';
import { SocketContext } from '../../context/SocketContext';
import { Card } from '@material-ui/core';

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
  const { _id } = useSelector((state: RootState) => state.restaurantData);
  const [value, setValue] = React.useState(0);
  const [drinkType, setDrinkType] = React.useState(null);
  const [foodType, setFoodType] = React.useState<IFoodType[]>([]);
  const [foodTime, setFoodTime] = React.useState<ITimeFood[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    // TODO: emitir la mesa que se aparta para mostrarlo en el lado del administrador y a los otros clientes
    socket.emit('selected-table', {
      tableNumber: selectedTable, // mesa seleccionada
      idRestaurant: _id,
      isSelected: true
    });
  }, [socket, selectedTable, _id])

  const setDrink = (event: any) => {
    setDrinkType(event.target.value)
  }

  const setTimeFood = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFoodTime(event.target.value as ITimeFood[]);

  };

  const setFood = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFoodType(event.target.value as IFoodType[]);

  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const renderFoodByFilters = () => {
    if (foodTime.length > 0 && foodType.length > 0) {
      let newFoodList: IModelFood[] = []
      let newFoodList2: IModelFood[] = []

      items.food.forEach(item => {
        foodTime.forEach(time => {
          if (item.idTimeFood === time.idTimeFood)
            newFoodList.push(item)
        });
      });

      newFoodList.forEach(item => {
        foodType.forEach(time => {
          if (item.idFoodType === time.idFoodType)
            newFoodList2.push(item)
        });
      });

      return newFoodList2.map((item: IModelFood) => {
        return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item.id} />
      })

    } else
      if (foodTime.length > 0) {
        return foodTime.map((foodTime) => {
          return items.food.filter((x: IModelFood) => x.idTimeFood === foodTime.idTimeFood).map((item: IModelFood) => {
            return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item.id} />
          })
        })
      } else

        if (foodType.length > 0) {
          return foodType.map((foodType) => {
            return items.food.filter((x: IModelFood) => x.idFoodType === foodType.idFoodType).map((item: IModelFood) => {
              return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item.id} />
            })
          })
        } else {
          return items.food.map((item: IModelFood) => {
            return <MenuItems item={item} itemType="food" itemName={item.plateName} key={item.id} />
          })
        }
  }

  return (
    <>
      <AppBar position='fixed'>
        <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">

          <Tab label="Platillos" icon={<LocalDiningIcon />} {...a11yProps(0)} />
          <Tab label="Bebidas" icon={<LocalBarIcon />} {...a11yProps(1)} />
          <Tab label="Ofertas/Combos" icon={<FastfoodIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
        <Grid container justify="flex-end" style={{ marginTop: "48px" }} >
            <Card  style={{ width: "100%",  marginTop: "14px" }}> 
                <MultiSelect renderItems={foodTime}
                  items={timeFoodTypeList}
                  setItemValue={setTimeFood}
                  idItemType="idTimeFood"
                  itemName="timeFoodName"
                  placeHolder="Filtrar por tiempo de comida" />

                <MultiSelect renderItems={foodType}
                  items={foodTypeList}
                  setItemValue={setFood}
                  idItemType="idFoodType"
                  itemName="foodName"
                  placeHolder="Filtrar por tipo de comida" /> 
            </Card> 
          {renderFoodByFilters()}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container justify="flex-end">
          <SelectItem idItem={drinkType}
            items={drinkTypeList}
            setItemValue={setDrink}
            idItemType="idDrinkType"
            itemName="drinkName"
            placeHolder="Filtrar por tipo de bebida"
          />
        </Grid>
        {
          !drinkType ? items.drink.map((item: IModelDrinks) => {
            return <MenuItems item={item} itemType="drink" key={item.id}
              itemName={item.drinkName} />
          })
            :
            items.drink.filter((x: IModelDrinks) => x.idDrinkType === drinkType).map((item: IModelDrinks) => {
              return <MenuItems item={item} itemType="drink" key={item.id}
                itemName={item.drinkName} />
            })
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <ButtonDial tableNumber= {selectedTable}/>
    </>
  );
}

