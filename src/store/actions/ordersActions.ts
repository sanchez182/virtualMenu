import { IOrder, IOrderAction,SET_ORDER_STATE,UPDATE_ID_ORDER,UPDATE_ORDER_CLIENTID,UPDATE_ORDER_STATUS} from './actionsInterfaces/IOrdersActions';
 

export const updateOrderStatus = (payload: any):
IOrderAction => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload 
  }
} 

export const updateOrderClientId= (payload: any):
IOrderAction => {
  return {
    type: UPDATE_ORDER_CLIENTID,
    payload 
  }
} 

export const updateIdOrder= (payload: any):
IOrderAction => {
  return {
    type: UPDATE_ID_ORDER,
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