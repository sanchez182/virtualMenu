
export const SET_ORDER_STATE = 'SET_ORDER_STATE'; 
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'; 
export const UPDATE_ORDER_CLIENTID = 'UPDATE_ORDER_CLIENTID'; 
export const UPDATE_ORDER = 'UPDATE_ORDER'; 


export interface IOrder {
  _id: string | null,
  idRestaurant: string | null,
  tableNumber: number,
  extraInfo: string,
  clientId: string,
  trackingCode:string,
  itemsOrder: {
    itemsFood: [],
    itemsDrink: [],
  }
  state: number,
  date: Date | null
}

interface SetOrderAction {
  type: String;
  payload: IOrder;
}

export type IOrderAction= SetOrderAction;