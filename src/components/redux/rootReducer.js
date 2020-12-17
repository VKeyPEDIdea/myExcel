import { actionTypes } from "./actionTypes";

export function rootReducer(state, action) {
  let prevColState, prevRowState;

  switch(action.type) {
    case actionTypes.tableResize:
      prevColState = state.colState || {};
      prevRowState = state.rowState || {};
      
      if (action.data.resizeType == 'row') {
        prevRowState[action.data.id] = action.data.value;
      } else if (action.data.resizeType == 'col') {
        prevColState[action.data.id] = action.data.value;
      }

      return {
        ...state,
        colState: prevColState,
        rowState: prevRowState,
      };

    default: return state;
  }
}