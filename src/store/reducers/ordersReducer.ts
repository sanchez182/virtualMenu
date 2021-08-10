import { SET_ORDER_STATE, UPDATE_ORDER_STATUS,
  UPDATE_ORDER,IOrdersModel, IOrderAction } from '../actions/actionsInterfaces/IOrdersActions';

const initialState: IOrdersModel = {
    _id: null,
    idRestaurant: null,
    tableNumber: 0,
    itemsOrder: {
      itemsFood: [],
      itemsDrink: [],
    },
    state: "",
    date: null
  }


const ordersReducer = (state = initialState, action: IOrderAction) => {
  switch (action.type) {
    case SET_ORDER_STATE:
      return  action.payload
    
   case UPDATE_ORDER_STATUS:
        const newState = {...state}
        newState.state = action.payload.state
        return  newState 
    default:
      return state;
  }
}

export default ordersReducer;