  
import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import langReducer from './reducers/langReducer';
import menuItemReducer from './reducers/menuItemsReducer'; 
import alertComponentReducer from './reducers/alertComponentReducer';
import requestReducer from './reducers/requestReducer';
import restaurantReducer from './reducers/restaurantReducer ';
import ordersReducer from './reducers/ordersReducer';

const rootReducer = combineReducers({
  lang: langReducer,
  menuItemReducer,
  orderData: ordersReducer,
  openMessageAlert:alertComponentReducer,
  requestReducer,
  restaurantData: restaurantReducer
});

const middleware = [thunk]
const store = createStore(rootReducer,{}, composeWithDevTools(applyMiddleware(...middleware)));

export type RootState = ReturnType<typeof rootReducer>;

export default store;