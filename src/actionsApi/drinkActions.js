import DrinkService from "../services/DrinkService"; 
import store from "../store";

const dispatch = store.dispatch;
const service = new DrinkService();

export const getAllDrinks = async () => {
  const response = await service.getAllDrinks()
  if (response.status === 200) {
  }
return response.data
}