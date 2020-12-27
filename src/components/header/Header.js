import { ExcelComponent } from "@core/ExcelComponent";
import { storage } from "../../core/utils";
import { actionCreate } from "../redux/actionCreate";
import { actionTypes } from "../redux/actionTypes";

export class Header extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
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
        <div class="btn">  
          <i class="material-icons">delete</i>
        </div>
        <div class="btn">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `;
  }

  onInput(e) {
    const text = e.target.value;
    this.$dispatch(actionCreate(text, actionTypes.changeTitle));
  }
}