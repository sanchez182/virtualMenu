import { SET_ORDER_STATE, UPDATE_ORDER_STATUS, UPDATE_ORDER_CLIENTID,UPDATE_ID_ORDER, IOrderAction, IOrder } from '../actions/actionsInterfaces/IOrdersActions';

const InitialState: IOrder = {
  _id: null,
  idRestaurant: null,
  tableNumber: -1,
  extraInfo: "",
  clientId: "",
  trackingCode:"",
  itemsOrder: {
    itemsFood: [],
    itemsDrink: [],
  },
  state: -1,
  date: null
}

const ordersReducer = (state: IOrder = InitialState, action: IOrderAction) => {
  switch (action.type) {
    case SET_ORDER_STATE:
      return action.payload

    case UPDATE_ORDER_CLIENTID:
      return { ...state, cliendId: action.payload }
    
      case UPDATE_ID_ORDER:
        return { ...state, _id: action.payload }

    case UPDATE_ORDER_STATUS:
      return { ...state, state: action.payload }

    default:
      return state;
  }
}

export default ordersReducer;