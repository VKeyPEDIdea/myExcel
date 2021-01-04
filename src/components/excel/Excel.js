import { Dom } from '../../core/dom';
import { Emitter } from '../../core/Observer';
import { StoreSubscriber } from '../../core/StoreSubscriber';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
    this.storageTableName = options.storageTableName;
  }

  getRoot() {
    const root = Dom.createDomElement('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
      storageTableName: this.storageTableName,
    };

    this.components = this.components.map(Component => {
      const element = Dom.createDomElement('div', Component.getClassName());

      const component = new Component(element, componentOptions);
      element.html = component.toHTML();

      root.append(element);

      return component;
    });

    return root;
  }

  init() {
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}