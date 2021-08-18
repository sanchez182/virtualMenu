import { ITable } from "../../components/Tables";
import { ADD_OR_UPDATE_TABLE, ITableActions, ITableModel,SET_TABLE_LIST, SET_SELECTED_TABLE } from "../actions/actionsInterfaces/ITableActions";

const addOrUpdate=(oldState:ITableModel,data:ITable)=>{
  const newOrder = {...oldState}
  debugger
  const {_id,selected,type,tableNumber, } = data
  const exists = newOrder.tableList.find((x:ITable)=> x._id === data._id)
  const index = newOrder.tableList.findIndex((x:ITable)=> x._id === data._id)
  if(exists){
      newOrder.tableList[index] = data
  }else{
      newOrder.tableList.push({
      _id,
      selected,
      type,
      tableNumber
 })
  }
  return newOrder
}

const InitialState: ITableModel = {
  selectedTable : {_id : "" , type : "", selected: false, tableNumber : 0},
  tableList: []
}

const tablesDataReducer = (state: ITableModel = InitialState, action: ITableActions) => {
  switch (action.type) {
    case SET_SELECTED_TABLE:
      return {...state, selectedTable: action.payload.selectedTable }

    case ADD_OR_UPDATE_TABLE:
      return addOrUpdate(state,action.payload.tableList[0])
    
     case SET_TABLE_LIST:
       debugger
        return {...state, tableList: action.payload.tableList }
      

    default:
      return state;
  }
}

export default tablesDataReducer;