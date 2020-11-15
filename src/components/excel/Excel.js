import { Dom } from "../../core/dom";

export class Excel {
  constructor(selector, options) {
    this.element = new Dom(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const root = Dom.createDomElement('div', 'excel');

    this.components = this.components.map(Component => {
      const element = Dom.createDomElement('div', Component.getClassName());
      
      const component = new Component(element);
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
}