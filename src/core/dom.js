export class Dom {
  constructor(selector) {
    this.element = typeof (selector) === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  get html() {
    return this.element.outerHTML.trim();
  }

  set html(markup) {
    this.element.innerHTML = markup;
    return this;
  }

  clear() {
    this.html('');
    return this;
  }

  /**
   * function on. Adds listener to some event
   * @param {string} eventType type of event for event handler
   * @param {function} callback handler function
   */
  on(eventType, callback) {
    this.element.addEventListener(eventType, callback);
  }
  /**
   * function on. Removes listener to some event
   * @param {string} eventType type of event for event handler
   * @param {function} callback handler function
   */
  off(eventType, callback) {
    this.element.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) node = node.element;

    if (Element.prototype.append) {
      this.element.append(node);
    } else {
      this.element.appendChild(node);
    }
  }

  getClosest(selector) {
    return new Dom(this.element.closest(selector));
  }

  getCoordinates() {
    return this.element.getBoundingClientRect();
  }

  get data() {
    return this.element.dataset;
  }

  findAll(selector) {
    return this.element.querySelectorAll(selector);
  }

  /**
   * function setStyles.
   * @param {DOMElement} el aim element to changing css styles.
   * @param {object} styles styles to element
   */
  static setStyles(el, styles = {}) {
    if (el.element) el = el.element;
    
    Object.keys(styles).forEach(key => {
      el.style[key] = styles[key];
    });
  }

  /**
   * function createDomElement
   * @param {string} tagName tagname of document element
   * @param {Array} classes classes for created element
   */
  static createDomElement(tagName, classes = '') {
    const element = document.createElement(tagName);

    if (typeof(classes) == 'string') {
      element.classList.add(classes);
    }

    return new Dom(element);
  }
}