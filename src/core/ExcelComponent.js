import { DOMListener } from "./DOMListener";

export class ExcelComponent extends DOMListener {
  constructor(root, options = {}) {
    super(root, options.listeners);
    this.name = options.name;
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }
  
  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}