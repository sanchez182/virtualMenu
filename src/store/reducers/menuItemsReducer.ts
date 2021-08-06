  
import { IModelMenuItem } from '../../interfaces/IModelMenuItem';
import { IMenuItemsActions,SET_MENUITEM,MenuStage} from '../actions/actionsInterfaces/IMenuItemsActions';
 const modelMenu : IModelMenuItem = {
  food :  [],
  drink :  [],
 }


const initialState: MenuStage ={ items: modelMenu}

const menuItemsReducer = (state = initialState, action: IMenuItemsActions) => {
  switch(action.type) {
    case SET_MENUITEM:
      debugger
      return {
        ...state, 
        item: action.payload
      }
    default:
      return state;
  }
}

export default menuItemsReducer;