import { CODES } from './table.template';
import { getColumnTitle } from './table.template';

export class TableSelection {
  constructor() {
    this.group = [];
    this._className = 'selected';
  }

  get className() {
    return this._className; 
  }

  select(el) {
    this.clear();
    this.group.push(el);
    el.addClass(this.className);
  }
  
  clear() {
    this.group.forEach(cell => cell.removeClass(this.className));
    this.group = [];
  }

  selectGroup(startCell, endCell, tableEl) {
    const startAddress = startCell.element.dataset.cellAddress;
    const endAddress = endCell.element.dataset.cellAddress;
    const startRow = Number(startAddress.slice(1));
    const endRow = Number(endAddress.slice(1));
    const startCol = startAddress.slice(0, 1);
    const endCol = endAddress.slice(0, 1);

    // const title = getColumnTitle(1);
    console.log(startRow, startCol, endRow, endCol);

    this.clear();
    for (let i = startRow; i < endRow + 1; i++) {
      let el = tableEl.findElement(`[data-cell-address="${startCol}${i}"]`);
      this.group.push(el);
      el.addClass(this.className);
    }

    console.log(startAddress, endAddress);
  }
}