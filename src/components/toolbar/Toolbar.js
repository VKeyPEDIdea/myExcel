import { ExcelComponent } from '../../core/ExcelComponent';
import { actionCreate } from '../redux/actionCreate';
import { actionTypes } from '../redux/actionTypes';
import { getTargetBtn, isActionBtn } from './toolbar.helpers';
import { switchToolState, resetBtn } from './toolSwitcher';
import { createToolbar } from './toolbar.template';

export class Toolbar extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      ...options,
      listeners: ['mousedown'],
      subscribe: ['styleState'],
    });

    this.tools = {};
    this.styleState = this.store.getState().styleState;
  }

  static getClassName() {
    return 'excel__toolbar';
  }

  init() {
    super.init();

    this.$on('table:select', cell => {
      this.cellSelection = cell.element.dataset.cellAddress;
			const cellStyles = this.getStylesByCell(this.cellSelection);
			// console.log('Toolbar:', this.cellSelection);
      this.handleState(cellStyles);
    });

    this.findTools();
	}

	getStylesByCell(cellAddress) {
		return this.styleState[cellAddress];
	}

  findTools() {
    Object.values(actionTypes.setStyle).forEach(value => {
      this.tools[value] = this.root.element.querySelector(`[data-format-text="${value}"]`);
		});
  }

	storeChanged(changes) {
    this.styleState = changes.styleState;
		const cellStyles = this.getStylesByCell(this.cellSelection);

		this.handleState(cellStyles);
	}

	handleState(state) {
    if (state) {
      Object.keys(state).forEach(key => {
				switchToolState(key, state[key], this.tools);
			});
    } else {
      resetBtn(this.tools);
    }
  }

  onMousedown(event) {
    if (isActionBtn(event)) {
      const target = getTargetBtn(event);
			const formatType = target.dataset.formatText;

      this.$dispatch(actionCreate({
        id: this.cellSelection,
        formatType,
      }, actionTypes.setStyle[formatType]));
    }
  }

  toHTML() {
    return createToolbar();
  }
}