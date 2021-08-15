const socketClientReducer = (state: any = "" , action: any) => {
  switch (action.type) {
    case "SET_SOCKET_CLIENT":
      return action.payload

    default:
      return state;
  }
}

export default socketClientReducer;