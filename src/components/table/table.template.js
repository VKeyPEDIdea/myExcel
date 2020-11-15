import { Dom } from "../../core/dom";

const CODES = {
  A: 'A'.charCodeAt(),
  Z: 'Z'.charCodeAt(),
}

function getColumnTitle(i) {
  const title = String.fromCharCode(CODES.A + i);
  return title;
}

function createCol(number) {
  let column = Dom.createDomElement('div', 'column');
  column.element.textContent = getColumnTitle(number);

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

  header.append(cellStart);
  header.append(tableHeader);
    
  return header;
}

function createTableRow(colsCount, rowNum) {
  const row = Dom.createDomElement('div', 'row');
  const rowNumber = Dom.createDomElement('div', 'row-number');
  const data = Dom.createDomElement('div', 'data');
  let cell;

  rowNumber.element.textContent = rowNum + 1;

  for (let i = 0; i < colsCount + 1; i++) {
    cell = Dom.createDomElement('div', 'cell');
    cell.element.setAttribute('contenteditable', 'true');
    data.append(cell);
  }

  row.append(rowNumber);
  row.append(data);
  
  return row;
}

export function createTable(rowsCount = 100) {
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