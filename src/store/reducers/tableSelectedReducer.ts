const tableSelectedReducer = (state: any = {} , action: any) => {
  switch (action.type) {
    case "SET_SELECTED_TABLE":
      return action.payload

    default:
      return state;
  }
}

export default tableSelectedReducer;