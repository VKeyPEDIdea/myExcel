import { Dom } from '../../core/dom';

export function isShouldResize(event) {
  return event.target.dataset.resize;
}

export function isShouldSelect(event) {
  return event.target.dataset.cellAddress || false;
}

export function stylizeCell(cell, key) {
  if (key.align) {
    Dom.setStyles(cell, {
      'text-align': `${key.align}`,
    });
  }

  if (key.bold === true) {
    Dom.setStyles(cell, {
      'font-weight': 'bold',
    });
  } else if (key.bold === false) {
    Dom.setStyles(cell, {
      'font-weight': 'normal',
    });
  }

  if (key.underline === true) {
    Dom.setStyles(cell, {
      'text-decoration': 'underline',
    });
  } else if (key.underline === false) {
    Dom.setStyles(cell, {
      'text-decoration': 'none',
    });
  }

  if (key.italic === true) {
    Dom.setStyles(cell, {
      'font-style': 'italic',
    });
  } else if (key.italic === false) {
    Dom.setStyles(cell, {
      'font-style': 'normal',
    });
  }
}

export const CODES = {
  A: 'A'.charCodeAt(),
  Z: 'Z'.charCodeAt(),
};

export function getCharByNumber(number) {
  return String.fromCharCode(number);
}

export function getColumnTitle(number) {
  const title = String.fromCharCode(CODES.A + number);
  return title;
}

export function getNumberByColumnTitle(char) {
  return char.charCodeAt();
}

export function getNextCellSelector(key, address) {
  const MIN_VALUE_ROW = 1;
  const MIN_VALUE_COL = getNumberByColumnTitle('A');

  let row = address.slice(1);
  let col = getNumberByColumnTitle(address.slice(0, 1));

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowUp':
      row = (row === MIN_VALUE_ROW) ? MIN_VALUE_ROW : row - 1;
      break;
    case 'ArrowLeft':
      col = (col === MIN_VALUE_COL) ? MIN_VALUE_COL : col - 1;
      break;
    default:
      break;
  }

  col = getCharByNumber(col);

  return `[data-cell-address="${col}${row}"]`;
}