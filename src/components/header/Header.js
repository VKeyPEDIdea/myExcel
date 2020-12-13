import { ExcelComponent } from "@core/ExcelComponent";

export class Header extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Header',
      ...options,
    });
  } 

  static getClassName() {
    return 'excel__header';
  }

  toHTML() {
    // console.log(this);
    return `
      <input type="text" class="input" value="Новая таблица">
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
}