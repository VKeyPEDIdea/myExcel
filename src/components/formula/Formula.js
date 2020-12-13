import { ExcelComponent } from "@core/ExcelComponent";
import { Dom } from '@core/dom';

export class Formula extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  static getClassName() {
    return 'excel__formula';
  }

  init() {
    super.init();
    const inputFormula = this.root.findElement('[data-element-formula="inputFormula"]');
    
    this.$on('table:select', cell => {
      inputFormula.text = cell.text;
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
  }

  onKeydown(event) {
    const { key } = event;

    if (key == 'Enter') {
      event.preventDefault();
      this.$emit('formula:EnterKeyDown');
    }
  }
}