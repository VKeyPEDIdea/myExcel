import { actionTypes } from "./actionTypes";

export function rootReducer(state, action) {
  let prevState;

  switch(action.type) {
    case actionTypes.tableResize:
      prevState = state.colState || {};
      prevState[action.data.id] = action.data.value;
      return {...state, colState: prevState}
    default: return state;
  }
}