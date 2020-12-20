import { Dom } from "../../core/dom";
import { CODES } from './table.helpers';
import { getColumnTitle } from './table.helpers';

function createCol(number, width) {
  let column = Dom.createDomElement('div', 'column');
  let colResize = Dom.createDomElement('div', 'col-resize');

  column.element.textContent = getColumnTitle(number);

  if (width != '') {
    Dom.setStyles(column, {
      'width': `${width}px`,
    })
  }

  column.addAttributes({
    'data-resizable': true,
    'data-table-x': number + 1
  });

  colResize.addAttributes({
    'data-resize': 'col'
  });

  column.append(colResize);

  return column;
}

function createTableHeader(colsCount, colState) {
  const header = Dom.createDomElement('div', 'row');
  const cellStart = Dom.createDomElement('div', 'cell-start');
  const tableHeader = Dom.createDomElement('div', 'table-header');
  let column, width;

  for (let i = 0; i < colsCount + 1; i++) {
    width = colState[i + 1] ? colState[i + 1] : '';
    column = createCol(i, width);
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

function createTableCell(number, rowNum, width = '', dataState) {
  let cell = Dom.createDomElement('div', 'cell');
  let cellAddress = getColumnTitle(number) + (rowNum + 1);


  cell.addAttributes({
    'contenteditable': true,
    'data-table-x': number + 1,
    'data-cell-address': cellAddress,
  });

  cell.text = dataState[cellAddress] || '';

  if (width != '') {
    Dom.setStyles(cell, {
      'width': `${width}px`,
    });
  }

  return cell;
}

function createTableRow(options = {}) {
// function createTableRow(colsCount, colState, height, rowNum) {
  let {
    colsCount,
    colState,
    dataState,
    height,
    number: rowNum
  } = options;

  const row = Dom.createDomElement('div', 'row');
  row.addAttributes({
    'data-resizable': true,
    'data-table-y': rowNum + 1,
  });

  Dom.setStyles(row, {
    height: `${height}px`,
  })

  const rowNumber = createRowNumber(rowNum);
  const data = Dom.createDomElement('div', 'data');

  const rowResize = Dom.createDomElement('div', 'row-resize');
  rowResize.addAttributes({
    'data-resize': 'row'
  });

  rowNumber.append(rowResize);

  let cell, width;

  for (let i = 0; i < colsCount + 1; i++) {
    width = colState[i + 1] ? colState[i + 1] : '';
    cell = createTableCell(i, rowNum, width, dataState);
    data.append(cell);
  }

  row.append(rowNumber, data);

  return row;
}

export function createTable(rowsCount = 50, state = {}) {
  const table = Dom.createDomElement('div', 'table');
  const { colState, rowState, dataState } = state;
  const colsCount = CODES.Z - CODES.A;
  const headerRow = createTableHeader(colsCount, colState);
  let options = {
    colsCount,
    colState,
    dataState,
    height: null,
    number: null,
  };
  
  let row;

  table.append(headerRow);

  for (let i = 0; i < rowsCount; i++) {
    options.height = rowState[i + 1] ? rowState[i + 1] : '';
    options.number = i;
    row = createTableRow(options);
    table.append(row);
  }

  return table.element.outerHTML;
}