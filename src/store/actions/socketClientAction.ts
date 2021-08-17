export const SET_SOCKET_CLIENT = "SET_SOCKET_CLIENT"
export const SET_SOCKET_CLIENT_MASTER = "SET_SOCKET_CLIENT_MASTER"

export interface ISocketIdClients{
  socketIdMaster: string,
  socketClientId: string,
}

export const setSocketClient = (payload: string) => {
  return {
    type: SET_SOCKET_CLIENT,
    payload 
  }
}
 
export const setSocketClientMaster = (payload: string) => {
  return {
    type: SET_SOCKET_CLIENT_MASTER,
    payload 
  }
}