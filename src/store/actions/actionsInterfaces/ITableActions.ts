import { ITable } from "../../../components/Tables";

export const SET_SELECTED_TABLE = 'SET_SELECTED_TABLE';
export const ADD_OR_UPDATE_TABLE = 'ADD_OR_UPDATE_TABLE';
export const SET_TABLE_LIST = 'SET_TABLE_LIST';

export interface ITableModel {
  selectedTable: ITable,
  tableList: ITable[]
}



interface SetITableAction {
  type: string;
  payload: ITableModel;
}

export type ITableActions = SetITableAction;