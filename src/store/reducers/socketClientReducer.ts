import { ISocketIdClients, SET_SOCKET_CLIENT, SET_SOCKET_CLIENT_MASTER } from "../actions/socketClientAction";

const InitialState: ISocketIdClients = {
  socketIdMaster: "",
  socketClientId: "",
}

const socketClientReducer = (state: ISocketIdClients = InitialState, action: any) => {
  switch (action.type) {
    case SET_SOCKET_CLIENT:
      localStorage.setItem("socketClientId",action.payload)
      return { ...state, socketClientId: action.payload }

    case SET_SOCKET_CLIENT_MASTER:
      return { ...state, socketIdMaster: action.payload }


    default:
      return state;
  }
}

export default socketClientReducer;