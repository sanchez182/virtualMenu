import DrinkService from "../services/DrinkService"; 
const service = new DrinkService();

export const getAllDrinks = async () => {
  const response = await service.getAllDrinks()
  if (response.status === 200) {
  }
return response.data
}