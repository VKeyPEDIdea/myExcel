import { ExcelComponent } from "../../core/ExcelComponent";
import { storage } from "../../core/utils";
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

    this.buttons = {};
    this.styleState = this.store.getState().styleState;
  } 

  static getClassName() {
    return 'excel__toolbar';
  }

  init() {
    super.init();

    this.$on('table:select', cell => {
      this.cellSelection = cell.element.dataset.cellAddress;
      console.log('Toolbar:', this.cellSelection);
      this.handleState(this.cellSelection);
    });

    this.findButtons();
  }
  
  findButtons() {
    Object.keys(actionTypes.setStyle).forEach(key => {
      this.buttons[key] = this.root.element.querySelector(`[data-format-text="${key}"]`);
    });
  }
	
	storeChanged(changes) {
    this.styleState = changes.styleState;
    
		this.handleState(this.cellSelection);
	}

	handleState(cellAddress) {
    const cellStyles = this.styleState[cellAddress];

    if (cellStyles) {
      Object.keys(cellStyles).forEach(key => this.switchBtnState(key, cellStyles[key]));
    } else {
      this.resetBtn();
    }
  }

  resetBtn() {
    for (let key in this.buttons) {
      this.buttons[key].classList.remove('active');
    }

    this.buttons.textAlignLeft.classList.add('active');
  }
  
  switchBtnState(key, value) {
    switch (key) {
      case 'bold':
        if (value == undefined) this.buttons.textBold.classList.add('active');
        
        value
          ? this.buttons.textBold.classList.add('active')
          : this.buttons.textBold.classList.remove('active');            
        break;
      case 'italic':
        if (value == undefined) this.buttons.textItalic.classList.add('active');

        value
          ? this.buttons.textItalic.classList.add('active')
          : this.buttons.textItalic.classList.remove('active');
        break;
      case 'underline':
        if (value == undefined) this.buttons.textUnderline.classList.add('active');

        value
          ? this.buttons.textUnderline.classList.add('active')
          : this.buttons.textUnderline.classList.remove('active');
        break;
      default:
        break;
    }
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