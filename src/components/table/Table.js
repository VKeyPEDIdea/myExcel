import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
    });
  }

  static getClassName() {
    return 'excel__table';
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      // init event onMousemove
      // console.log(event.target.dataset.resize);
      this.addEventListener('mousemove', () => this.onMousemove());
      console.log(this);
    };
  }

  onMousemove() {
    console.log('mousemove');
  }

  onMouseup() {
    console.log('mouseup');
    this.removeEventListener('mousemove', () => this.onMousemove());
  }
}