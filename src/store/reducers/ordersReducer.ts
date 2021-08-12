import { SET_ORDER_STATE,UPDATE_ORDER_STATUS, IOrderAction, IOrder } from '../actions/actionsInterfaces/IOrdersActions';

const InitialState : IOrder = {
  _id: null,
  idRestaurant: null,
  tableNumber: -1,
  extraInfo: "",
  itemsOrder: {
    itemsFood: [],
    itemsDrink: [],
  },
  state: -1,
  date: null
}

const ordersReducer = (state: IOrder = InitialState , action: IOrderAction) => {
  switch (action.type) {
    case SET_ORDER_STATE:
      return action.payload

      case UPDATE_ORDER_STATUS:
        return {...state, state: action.payload}

    default:
      return state;
  }
}

export default ordersReducer;