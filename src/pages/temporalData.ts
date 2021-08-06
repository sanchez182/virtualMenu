import { IDrinkType,IFoodType, ITimeFood } from "../interfaces/IModelMenuItem";


  const food1 : IFoodType = {
    idFoodType: 1,
    foodName: "Vegana"
  }
  
  const food2 : IFoodType = {
    idFoodType: 2,
    foodName: "Vegetariana"
  }
  const food3 : IFoodType = {
    idFoodType: 3,
    foodName: "Variada"
  }
  const food4 : IFoodType = {
    idFoodType: 4,
    foodName: "Postres"
  }


  const timeFood1 : ITimeFood = {
    idTimeFood:1,
    timeFoodName: "Desayuno"
  }

  const timeFood2 : ITimeFood = {
    idTimeFood:2,
    timeFoodName: "Almuerzo"
  }

  const timeFood3 : ITimeFood = {
    idTimeFood:3,
    timeFoodName: "Cena"
  }

  const timeFood4 : ITimeFood = {
    idTimeFood:4,
    timeFoodName: "Postre"
  }
  
  export const foodTypeList : IFoodType[] = [food1,food2,food3,food4]; 
  export const timeFoodTypeList : ITimeFood[] = [timeFood1,timeFood2,timeFood3,timeFood4]; 
 