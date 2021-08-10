
export const SET_ORDER_STATE = 'SET_ORDER_STATE'; 
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'; 
export const UPDATE_ORDER = 'UPDATE_ORDER'; 


export interface IOrdersModel {
  _id: String | null,
  idRestaurant: String | null,
  tableNumber: number,
  itemsOrder: {
    itemsFood: [],
    itemsDrink: [],
  }
  state: String,
  date: Date | null
}

interface SetOrderAction {
  type: String;
  payload: IOrdersModel;
}

export type IOrderAction= SetOrderAction;