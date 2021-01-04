import { getCharByNumber, getNumberByColumnTitle } from './table.helpers';

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
    el.setFocus().addClass(this.className);
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
    const colList = getColTitleList(startCol, endCol);
    const min = Math.min(startRow, endRow);
    const max = Math.max(startRow, endRow);

    this.clear();

    for (let i = min; i < max + 1; i++) {
      colList.forEach(column => {
        const el = tableEl.findElement(`[data-cell-address="${column}${i}"]`);
        this.group.push(el);
      });
    }

    this.group.forEach(cell => {
      cell.addClass(this.className);
    });
  }
}

function getColTitleList(startCol, endCol) {
  const colList = [];

  startCol = getNumberByColumnTitle(startCol);
  endCol = getNumberByColumnTitle(endCol);

  const max = Math.max(startCol, endCol);
  const min = Math.min(startCol, endCol);
  let colTitle;

  for (let i = min; i < max + 1; i++) {
    colTitle = getCharByNumber(i);
    colList.push(colTitle);
  }

  return colList;
}