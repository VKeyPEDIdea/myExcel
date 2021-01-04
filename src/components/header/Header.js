import { ExcelComponent } from "@core/ExcelComponent";
import { ActiveRoute } from "../../core/routes/ActiveRoute";
import { actionCreate } from "../redux/actionCreate";
import { actionTypes } from "../redux/actionTypes";
import { getTargetBtn } from "./header.helpers";
import { createHeaderBtn } from './header.template';

export class Header extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
    this.storageTableName = options.storageTableName;
  } 

  static getClassName() {
    return 'excel__header';
  }

  prepare() {
    this.title = this.store.getState().tableTitle;
  }

  toHTML() {
    return `
      <input type="text" class="input" value="${this.title}">
      <div>
        ${createHeaderBtn()}
      </div>
    `;
  }

  onClick(e) {
    const target = getTargetBtn(e);
    const action = target.dataset.btnAction;

    switch (action) {
      case 'exitToDashboard':
        ActiveRoute.navigate('')
        break;
      case 'delete':
        const decision = confirm(`Выдействительно хотите удалить таблицу «${this.title}»?`);

        if (decision) {
          localStorage.removeItem(this.storageTableName);
          ActiveRoute.navigate('');
        }
        break;
    }
  }

  onInput(e) {
    const text = e.target.value;
    this.$dispatch(actionCreate(text, actionTypes.changeTitle));
  }
}