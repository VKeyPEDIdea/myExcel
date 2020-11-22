import {
  ExcelComponent
} from "@core/ExcelComponent";
import {
  createTable
} from "./table.template";
import { resizeHandler } from "./table.resize";
import { isShouldResize } from "./table.helpers";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  static getClassName() {
    return 'excel__table';
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init()

    const cell = this.root.findElement('[data-cell-address="A1"]');
    this.selection.select(cell);
  }

  onMousedown(event) {
    if (isShouldResize(event)) {
      resizeHandler(event, this);
    };
  }
}