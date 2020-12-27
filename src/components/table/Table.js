import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isShouldResize, isShouldSelect, stylizeCell } from "./table.helpers";
import { TableSelection } from "./TableSelection";
import { Dom } from "../../core/dom";
import { getNextCellSelector } from './table.helpers';
import { actionCreate } from '../redux/actionCreate';
import { actionTypes } from "../redux/actionTypes";
import { initialState } from "../redux/initialState";

export class Table extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: ['dataState', 'styleState'],
      ...options,
    });
  }

  static getClassName() {
    return 'excel__table';
  }

  toHTML() {
    return createTable(20, initialState);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init()

    const cell = this.root.findElement('[data-cell-address="A1"]');
    this.selection.current = cell.element;
    this.selectCell(cell);

    this.$on('formula:input', text => {
      this.selection.current.textContent = text;
    });

    this.$on('formula:EnterKeyDown', () => {
      this.selection.current.focus();
    });
  }

  selectCell(DomElement) {
    this.selection.select(DomElement);
    this.$emit('table:select', DomElement);
  }

	storeChanged(changes) {
    this.styleState = changes.styleState;
    this.handleState()
  }

  handleState() {
    for (let cellAddress in this.styleState) {
      let cell = this.root.findElement(`[data-cell-address="${cellAddress}"]`);
      stylizeCell(cell, this.styleState[cellAddress]);
    }
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this);
      this.$dispatch(actionCreate(data, actionTypes.tableResize));
    } catch (error) {
      console.warn('Error:', error.message);
    }
  }

  onMousedown(event) {
    if (isShouldResize(event)) {
      this.resizeTable(event);
    };

    if (isShouldSelect(event)) {
      const startCell = new Dom(event.target);
      
      this.root.element.onmouseup = (e) => {
        const endCell = new Dom(e.target);
        const equalElement = startCell.element === endCell.element;

        switch(equalElement) {
          case true:
            this.selection.select(startCell);
            break;
          case false:
            isShouldSelect(e) ? this.selection.selectGroup(startCell, endCell, this.root) : this.selection.select(startCell);
        }
      }

      this.selectCell(startCell);
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
      this.selectCell(nextCell);
    };
  }
  
  updateTextInStore(text) {
    this.$dispatch(actionCreate({
      id: this.selection.current.dataset.cellAddress,
      text,
    }, actionTypes.changeText));
  }
  
  onInput(event) {
    const text = event.target.textContent.trim();
    this.updateTextInStore(text);
    this.$emit('table:input', text);
  }
}