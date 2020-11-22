import {
  Dom
} from "../../core/dom";

const CODES = {
  A: 'A'.charCodeAt(),
  Z: 'Z'.charCodeAt(),
}

function getColumnTitle(number) {
  const title = String.fromCharCode(CODES.A + number);
  return title;
}

function createCol(number) {
  let column = Dom.createDomElement('div', 'column');
  column.element.textContent = getColumnTitle(number);
  column.addAttributes({
    'data-resizable': true,
    'data-table-x': number + 1
  });

  let colResize = Dom.createDomElement('div', 'col-resize');
  colResize.addAttributes({
    'data-resize': 'col'
  });

  column.append(colResize);

  return column;
}

function createTableHeader(colsCount) {
  const header = Dom.createDomElement('div', 'row');
  const cellStart = Dom.createDomElement('div', 'cell-start');
  const tableHeader = Dom.createDomElement('div', 'table-header');
  let column;

  for (let i = 0; i < colsCount + 1; i++) {
    column = createCol(i);
    tableHeader.append(column);
  }

  header.append(cellStart, tableHeader);

  return header;
}

function createRowNumber(rowNum) {
  const rowNumber = Dom.createDomElement('div', 'row-number');
  rowNumber.element.textContent = rowNum + 1;

  return rowNumber;
}

function createTableCell(number, rowNum) {
  let cell = Dom.createDomElement('div', 'cell');
  cell.addAttributes({
    'contenteditable': true,
    'data-table-x': number + 1,
    'data-cell-address': getColumnTitle(number) + (rowNum + 1),
  });

  return cell;
}

function createTableRow(colsCount, rowNum) {
  const row = Dom.createDomElement('div', 'row');
  row.addAttributes({
    'data-resizable': true,
  });
  
  const rowNumber = createRowNumber(rowNum);
  const data = Dom.createDomElement('div', 'data');
  
  const rowResize = Dom.createDomElement('div', 'row-resize');
  rowResize.addAttributes({
    'data-resize': 'row'
  });
  
  rowNumber.append(rowResize);
  
  let cell;
  
  for (let i = 0; i < colsCount + 1; i++) {
    cell = createTableCell(i, rowNum);
    data.append(cell);
  }

  row.append(rowNumber, data);

  return row;
}

export function createTable(rowsCount = 20) {
  const table = Dom.createDomElement('div', 'table');
  const colsCount = CODES.Z - CODES.A;
  const headerRow = createTableHeader(colsCount);
  let row;

  table.append(headerRow);

  for (let i = 0; i < rowsCount; i++) {
    row = createTableRow(colsCount, i);
    table.append(row);
  }

  return table.element.outerHTML;
}