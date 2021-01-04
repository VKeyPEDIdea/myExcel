export class Emitter {
  constructor() {
    this.listeners = {};
  }

  /**
   * method emit. Notifies listeners if they are.
   * @param {string} eventName Title of event
   */
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    }

    this.listeners[eventName].forEach(listener => {
      listener(...args);
    });

    return true;
  }

  /**
   * method subscribe. Subscribes on some event.
   * @param {string} eventName Title of event
   * @param {function} func callback handler
   */
  subscribe(eventName, func) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(func);

    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== func);
    };
  }
}