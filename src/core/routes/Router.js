import { Dom } from "../dom";
import { ActiveRoute } from "./ActiveRoute";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.intropoint = new Dom(selector);
    this.routes = routes;
    this.page = null;
    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    this.intropoint.clear();

    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);

    this.intropoint.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}