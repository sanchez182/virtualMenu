import OrderService from "../services/OrderService";
import store from "../store";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";


const dispatch = store.dispatch;
const service = new OrderService();

export const getOrderById = async (id) => {
  const response = await service.getOrderById(id)
  return response.data
}


export const createOrder = async (body) => {
  const response = await service.createOrder(body)
  dispatch(setOpenMessageAlert({ show: true, message: 'Se creo correctamente la orden', severity: 'success' }));
  return (response.data.order)
}


export const updateOrder = async (idOrder, body) => {
  const response = await service.updateOrder(idOrder, body)
    dispatch(setOpenMessageAlert({ show: true, message: 'Se actualizo correctamente la orden', severity: 'success' }));
  return response.data.order.value
}

export const updateOrderClientId = async (idOrder, clientId) => {
  const response = await service.updateOrderClientId(idOrder, clientId)
    dispatch(setOpenMessageAlert({ show: true, message: 'Se actualizo correctamente la orden', severity: 'success' }));
  return response.data.order.value
}


export const createOrUpdateOrder = async (body) => {
  const id = body._id;
  delete body._id;
  if (id) {
    return await updateOrder(id, body)
  } else {
    return await createOrder(body)
  }
}