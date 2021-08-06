import RestaurantService from "../services/RestaurantService";
import { setRestaurantData } from "../store/actions/restaurantActions";
 
 


 const service = new RestaurantService();

 export const getRestaurantData = ()=>async(dispatch)=>{
    const response = await service.getRestaurantData()
    debugger
    dispatch(setRestaurantData(response.data))
 }