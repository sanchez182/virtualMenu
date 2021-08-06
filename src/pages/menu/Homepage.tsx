import  { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRestaurantData } from '../../actionsApi/restaurantActionsApi';
import { RootState } from '../../store'; 
import TablesHome from './TablesHome';
import {SocketProvider} from '../../context/SocketContext';

const HomePage: FC = () => {
  let { id }: any = useParams(); //este id viene por param en la url principal
  const dispatch = useDispatch()
  const { name } = useSelector((state: RootState) => state.restaurantData);
  useEffect(() => {
    //traer la data del restaurante
    dispatch(getRestaurantData()) //este id viene por param en la url principal
  }, [dispatch])
   
  return (
     name ? 
     <SocketProvider>
          <TablesHome/>
     </SocketProvider>
       : <p>Trayendo datos del restaurante </p>  //hacer componente de carga
  );
}

export default HomePage;