import TableService from "../services/TableService";
const service = new TableService();

 
export const getDataTables = async () => {
  const response = await service.getDataTables()
return response.data
}

export const updateTable = async (idTable, body) => {
  await service.updateTable(idTable, body)
  return true
}