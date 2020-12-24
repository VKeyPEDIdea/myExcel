import { ExcelComponent } from "../../core/ExcelComponent";
import { actionCreate } from "../redux/actionCreate";
import { actionTypes } from "../redux/actionTypes";
import { getTargetBtn, isActionBtn } from "./toolbar.helpers";

export class Toolbar extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      ...options,
      listeners: ['mousedown'],
      subscribe: ['styleState'],
    });

  } 

  static getClassName() {
    return 'excel__toolbar';
  }

  init() {
    super.init();

    // Получаем выделенную ячейку и ее адрес
    this.$on('table:select', cell => {
      this.cellSelection = cell.element.dataset.cellAddress;
      console.log('Toolbar:', this.cellSelection);
    });
  }

  onMousedown(event) {
    if (isActionBtn(event)) {
      let target = getTargetBtn(event);
      let formatType = target.dataset.formatText;
      
      this.$dispatch(actionCreate({
        id: this.cellSelection,
        formatType,
      }, actionTypes.setStyle[formatType]))
    }
  }

  toHTML() {
    return `
    <div class="btn" data-format-text="${actionTypes.setStyle.textAlignLeft}">  
      <i class="material-icons">format_align_left</i>
    </div>
    <div class="btn" data-format-text="${actionTypes.setStyle.textAlignCenter}">  
      <i class="material-icons">format_align_center</i>
    </div>
    <div class="btn" data-format-text="${actionTypes.setStyle.textAlignRight}">  
      <i class="material-icons">format_align_right</i>
    </div>
    <div class="btn" data-format-text="${actionTypes.setStyle.textBold}">  
      <i class="material-icons">format_bold</i>
    </div>
    <div class="btn" data-format-text="${actionTypes.setStyle.textItalic}">  
      <i class="material-icons">format_italic</i>
    </div>
    <div class="btn" data-format-text="${actionTypes.setStyle.textUnderline}">  
      <i class="material-icons">format_underline</i>
    </div>
    `;
  }
}