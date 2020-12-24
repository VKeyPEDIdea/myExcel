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
				...prevState[action.data.id],
        align: 'left',
      }
      return {
        ...state,
        styleState: prevState,
			}

    case actionTypes.setStyle.textAlignCenter:
      prevState = state.styleState || {};
      prevState[action.data.id] = {
				...prevState[action.data.id],
        align: 'center',
      }
      return {
        ...state,
        styleState: prevState,
      }

    case actionTypes.setStyle.textAlignRight:
      prevState = state.styleState || {};
      prevState[action.data.id] = {
				...prevState[action.data.id],
        align: 'right',
      }
      return {
        ...state,
        styleState: prevState,
			}
			
    case actionTypes.setStyle.textBold:
			prevState = state.styleState || {};
      prevState[action.data.id] = {
				...prevState[action.data.id],
        bold: prevState[action.data.id].bold ? !(prevState[action.data.id].bold) : true,
			}
      return {
        ...state,
        styleState: prevState,
			}

    case actionTypes.setStyle.textItalic:
			prevState = state.styleState || {};
      prevState[action.data.id] = {
				...prevState[action.data.id],
        italic: prevState[action.data.id].italic ? !(prevState[action.data.id].italic) : true,
      }
      return {
        ...state,
        styleState: prevState,
			}

    case actionTypes.setStyle.textUnderline:
			prevState = state.styleState || {};
      prevState[action.data.id] = {
				...prevState[action.data.id],
				underline: prevState[action.data.id].underline
					? !(prevState[action.data.id].underline)
					: true,
      }
      return {
        ...state,
        styleState: prevState,
			}

    default: return state;
  }
}

function handler(state, ) {

}