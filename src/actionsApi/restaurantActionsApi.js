import RestaurantService from "../services/RestaurantService";
import { setRestaurantData } from "../store/actions/restaurantActions";
 
 


 const service = new RestaurantService();

 export const getRestaurantData = (idRestaurant)=>async(dispatch)=>{
    const response = await service.getRestaurantData(idRestaurant)
    dispatch(setRestaurantData(response.data))
 }