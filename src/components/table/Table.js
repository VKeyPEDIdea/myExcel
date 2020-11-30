import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isShouldResize, isShouldSelect } from "./table.helpers";
import { TableSelection } from "./TableSelection";
import { Dom } from "../../core/dom";
import { getNextCellSelector } from './table.helpers';

export class Table extends ExcelComponent {
  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown','keydown'],
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
    this.selection.current = cell.element;
    this.selection.select(cell);
  }

  onMousedown(event) {
    if (isShouldResize(event)) {
      resizeHandler(event, this);
    };

    if (isShouldSelect(event)) {
      const startCell = new Dom(event.target);

      this.root.element.onmouseup = (e) => {
        const endCell = new Dom(e.target);
        startCell.element === endCell.element ? this.selection.select(startCell) : this.selection.selectGroup(startCell, endCell, this.root);
      }
      this.selection.current = startCell.element;
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const currentSelectionAddress = this.selection.current.dataset.cellAddress;
      const selector = getNextCellSelector(key, currentSelectionAddress);
      const nextCell = this.root.findElement(selector);
      this.selection.current = nextCell.element;
      this.selection.select(nextCell);
    };
  }
}