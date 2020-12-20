import { actionTypes } from "./actionTypes";

export function rootReducer(state, action) {
  let prevState, field;

  switch(action.type) {
    case actionTypes.tableResize:
      field = action.data.resizeType == 'col' ? 'colState' : 'rowState';
      prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;

      return {
        ...state, [field]: prevState,
      };

    case actionTypes.changeText:
      prevState = state.dataState || {};
      prevState[action.data.id] = action.data.text;

      return {
        ...state,
        dataState: prevState,
      }

    default: return state;
  }
}