import React, { useEffect } from 'react';
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



export default function OnlyMenuComponent() {
  const { t } = useTranslation()
  //TODO: por param llega el numero de mesa
  const { items } = useSelector((state: RootState) => state.menuItemReducer);
  const { foodTimeList, _id, foodTypeList, drinkTypeList } = useSelector((state: RootState) => state.restaurantData);
  const [value, setValue] = React.useState(0);

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
        dispatch(setMenuItems(items));

      }).catch(error => {
      });
    }
    fetchData();
  }, [dispatch, items ])

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
        return <MenuItems renderButtons={false} item={item} itemType="food" itemName={item.plateName} key={item._id} />
      }) : withoutData()

    } else
      if (foodTime.length > 0) {
        let data: JSX.Element[] = [];
        foodTime.forEach((foodTime) => {
          items.food.filter((x: IModelFood) => x.foodTime === foodTime.foodTimeName).forEach((item: IModelFood) => {
            data.push(<MenuItems renderButtons={false} item={item} itemType="food" itemName={item.plateName} key={item._id} />)
          })
        })
        return renderItems(data)
      } else
        if (foodType.length > 0) {
          let data: JSX.Element[] = [];
          foodType.forEach((foodType) => {
            items.food.filter((x: IModelFood) => x.foodType === foodType.foodTypeName).forEach((item: IModelFood) => {
              data.push(<MenuItems renderButtons={false} item={item} itemType="food" itemName={item.plateName} key={item._id} />)
            })
          })
          return renderItems(data)
        } else {
          return items.food.map((item: IModelFood) => {
            return <MenuItems renderButtons={false} item={item} itemType="food" itemName={item.plateName} key={item._id} />
          })
        }
  }

  const renderDrinksByFilter = () => {
    if (drinkType.length > 0) {
      let data: JSX.Element[] = [];
      drinkType.forEach((drinkType) => {
        items.drink.filter((x: IModelDrinks) => x.drinkType === drinkType.drinkTypeName).forEach((item: IModelDrinks) => {
          data.push(<MenuItems renderButtons={false} item={item} itemType="drink" itemName={item.drinkName} key={item._id} />)
        })
      })
      return renderItems(data)
    } else {
      return items.drink.map((item: IModelDrinks) => {
        return <MenuItems renderButtons={false} item={item} itemType="drink" itemName={item.drinkName} key={item._id} />
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

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className="tapPanelFullWidth" >
        <Grid container style={{ marginTop: "48px" }}>
          <Grid item xs={12} md={12} >

            <ChangeLenguage showIdClient={false}/>
            <Card style={{ marginTop: "48px" }}>
              <MultiSelect 
                items={foodTimeList}
                setItemValue={setTimeFood}
                itemName="foodTimeName"
                placeHolder={t("filterByFoodTime")} />

              <MultiSelect 
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
              <MultiSelect 
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


    </>
  );
}

