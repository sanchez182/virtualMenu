import { IOrder, IOrderAction,SET_ORDER_STATE,UPDATE_ORDER_STATUS} from './actionsInterfaces/IOrdersActions';
 

export const updateOrderStatus = (payload: any):
IOrderAction => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload 
  }
} 

export const setOrder = (payload: IOrder):
IOrderAction => {
  return {
    type: SET_ORDER_STATE,
    payload 
  }
}