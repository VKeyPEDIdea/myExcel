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

    case actionTypes.setStyle.textAlignLeft:
      prevState = state.styleState || {};
      prevState[action.data.id] = {
        align: 'left',
      }
      return {
        ...state,
        styleState: prevState,
      }

    case actionTypes.setStyle.textAlignCenter:
      prevState = state.styleState || {};
      prevState[action.data.id] = {
        align: 'center',
      }
      return {
        ...state,
        styleState: prevState,
      }

    case actionTypes.setStyle.textAlignRight:
      prevState = state.styleState || {};
      prevState[action.data.id] = {
        align: 'right',
      }
      return {
        ...state,
        styleState: prevState,
      }
    // case actionTypes.setStyle.textBold:
    // case actionTypes.setStyle.textItalic:
    // case actionTypes.setStyle.textUnderline:

    default: return state;
  }
}