import { actionTypes } from "../redux/actionTypes";

function createBtn(config) {
  return `
  <div class="btn" data-format-text="${config.formatType}">  
    <i class="material-icons">${config.iconName}</i>
  </div>
  `
}

const configBtns = [
  {
    iconName: 'format_align_left',
    formatType: actionTypes.setStyle.textAlignLeft,
  },
  {
    iconName: 'format_align_center',
    formatType: actionTypes.setStyle.textAlignCenter,
  },
  {
    iconName: 'format_align_right',
    formatType: actionTypes.setStyle.textAlignRight,
  },
  {
    iconName: 'format_bold',
    formatType: actionTypes.setStyle.textBold,
  },
  {
    iconName: 'format_italic',
    formatType: actionTypes.setStyle.textItalic,
  },
  {
    iconName: 'format_underline',
    formatType: actionTypes.setStyle.textUnderline,
  },
];

export function createToolbar() {
  return configBtns.map(createBtn).join('');
}