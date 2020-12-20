import { ExcelComponent } from "@core/ExcelComponent";
import { Dom } from '@core/dom';
import { actionCreate } from '../redux/actionCreate';
import { actionTypes } from '../redux/actionTypes';

export class Formula extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
    this.tableSelectionAddress;
  }

  static getClassName() {
    return 'excel__formula';
  }

  init() {
    super.init();
    const inputFormula = this.root.findElement('[data-element-formula="inputFormula"]');
    const cellSelected = '[data-cell-address="A1"]';

    inputFormula.text = document.querySelector(cellSelected).textContent;

    this.$on('table:select', cell => {
      inputFormula.text = cell.text;
      this.tableSelectionAddress = cell.element.dataset.cellAddress;
    });

    this.$on('table:input', text => {
      inputFormula.text = text;
    });
  }

  toHTML() {
    return `
      <div class="icon">fx</div>
      <div data-element-formula="inputFormula" class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    
    this.$emit('formula:input', text);
    this.$dispatch(actionCreate({
      id: this.tableSelectionAddress,
      text,
    }, actionTypes.changeText));
  }

  onKeydown(event) {
    const { key } = event;

    if (key == 'Enter') {
      event.preventDefault();
      this.$emit('formula:EnterKeyDown');
    }
  }
}