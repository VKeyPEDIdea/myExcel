import {
  ExcelComponent
} from "@core/ExcelComponent";
import {
  createTable
} from "./table.template";
import { resizeHandler } from "./table.resize";
import { isShouldResize } from "./table.helpers";

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

  onMousedown(event) {
    if (isShouldResize(event)) {
      resizeHandler(event, this);
    };
  }
}