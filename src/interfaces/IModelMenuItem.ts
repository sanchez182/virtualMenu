export interface IModelFood {
     plateName: string;
     description: string;
     idImg: string;
     urlImage: string;
     price: number;
     foodType: string;
     foodTime: string;
     showInMenu: boolean;
     ingredients: [];
     updatatedDate: Date;
     cant: number,
     _id: number
  }

  export interface IModelDrinks {
    idDrinkType: number;
    description: string; 
    drinkName: string; 
    idImg: string; 
    price: number;
    urlImage: string; 
    ingredients : [];
    drinkType: string;
    showInMenu: boolean
    cant: number,
    _id: number
  }

  export interface IModelMenuItem {
    food: IModelFood[],
    drink:IModelDrinks[]
  }

  export interface IDrinkType {
    drinkTypeName: string;
    isActive: boolean;
    showInApp: boolean;
  }

/*   export interface IDrinkType {
    idDrinkType: number;
    drinkName: String; 
    idImg: String; 
    price: number;
    urlImage: String; 
    ingredients : [];
    drinkType: string;
    showInMenu: boolean
  }
 */
  export interface IFoodType {
    foodTypeName: string;
    showInApp: boolean;
  }

  export interface ITimeFood {
    foodTimeName: string;
    showInApp: boolean;
  }

