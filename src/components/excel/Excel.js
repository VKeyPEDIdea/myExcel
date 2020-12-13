import { Dom } from "../../core/dom";
import { Emitter } from "../../core/Observer";

export class Excel {
  constructor(selector, options) {
    this.element = new Dom(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const root = Dom.createDomElement('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
    }

    this.components = this.components.map(Component => {
      const element = Dom.createDomElement('div', Component.getClassName());
      
      const component = new Component(element, componentOptions);
      element.html = component.toHTML();
      
      root.append(element);

      return component;
    });

    return root;
  }

  render() {
    let node = this.getRoot();
    this.element.append(node);
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}