import { ADD_OR_UPDATE_TABLE, ITableModel, SET_TABLE_LIST,SET_SELECTED_TABLE } from "./actionsInterfaces/ITableActions"


export const setTableSeleted = (payload: ITableModel) => {
  return {
    type: SET_SELECTED_TABLE,
    payload 
  }
}
 
export const addOrUpdateTable = (payload: ITableModel) => {
  return {
    type: ADD_OR_UPDATE_TABLE,
    payload 
  }
}

export const setTableList = (payload: ITableModel) => {
  return {
    type: SET_TABLE_LIST,
    payload 
  }
}