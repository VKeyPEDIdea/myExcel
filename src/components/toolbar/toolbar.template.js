import { actionTypes } from "../redux/actionTypes";

function createBtn(config) {
  return `
  <div class="btn ${config.active ? 'active' : ''}" data-format-text="${config.formatType}">  
    <i class="material-icons">${config.iconName}</i>
  </div>
  `
}

const configBtns = [
  {
    iconName: 'format_align_left',
    formatType: actionTypes.setStyle.textAlignLeft,
    active: false
  },
  {
    iconName: 'format_align_center',
    formatType: actionTypes.setStyle.textAlignCenter,
    active: false,
  },
  {
    iconName: 'format_align_right',
    formatType: actionTypes.setStyle.textAlignRight,
    active: false,
  },
  {
    iconName: 'format_bold',
    formatType: actionTypes.setStyle.textBold,
    active: false,
  },
  {
    iconName: 'format_italic',
    formatType: actionTypes.setStyle.textItalic,
    active: false,
  },
  {
    iconName: 'format_underline',
    formatType: actionTypes.setStyle.textUnderline,
    active: false,
  },
];

export function createToolbar() {
  return configBtns.map(createBtn).join('');
}