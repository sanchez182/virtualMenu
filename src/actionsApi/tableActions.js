import TableService from "../services/TableService";
import store from "../store";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
/* import { setDataToTables } from "../store/actions/tableActions";

 */

const dispatch = store.dispatch;
const service = new TableService();

 
export const getDataTables = async () => {
  const response = await service.getDataTables()
  if (response.status === 200) {
  }
return response.data
}

export const updateTable = async (idTable, body) => {
  const response = await service.updateTable(idTable, body)
  //dispatch(setOpenMessageAlert({ show: true, message: `Se actualizó correctamente la mesa número ${response.data.table.tableNumber}`, severity: 'success' }));
  //dispatch(setDataToTables(response.data))
  return true
}