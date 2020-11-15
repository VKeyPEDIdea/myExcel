import { ExcelComponent } from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  constructor(root) {
    super(root, {
      name: 'Formula',
      listeners: ['input'],
    });
  }

  static getClassName() {
    return 'excel__formula';
  }

  toHTML() {
    return `
      <div class="icon">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log(event.target.textContent.trim());
  }
}