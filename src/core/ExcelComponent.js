import { DOMListener } from "./DOMListener";

export class ExcelComponent extends DOMListener {
  constructor(root, options = {}) {
    super(root, options.listeners);
    this.name = options.name;
    this.store = options.store;
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {
    
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  /**
   * framework $emit function. Notify listeners about event
   * @param {object} event 
   * @param  {...any} args 
   */
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  /**
   * framework $on function. Subcribe on event
   * @param {object} event Event object
   * @param {function} func Some function handler
   */
  $on(event, func) {
    const unsub = this.emitter.subscribe(event, func);
    this.unsubscribers.push(unsub);
  }

  /**
   * framework $dispatch function. Redux store method: changes state of component.
   * @param {object} action Action object 
   */
  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Приходят только те изменения, на которые мы подписались
  storeChanged() {}
  
  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}