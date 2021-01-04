import { Excel } from '../../components/excel/Excel';
import { Formula } from '../../components/formula/Formula';
import { Header } from '../../components/header/Header';
import { initialState } from '../../components/redux/initialState';
import { rootReducer } from '../../components/redux/rootReducer';
import { Table } from '../../components/table/Table';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { createStore } from '../../core/createStore';
import { storage } from '../../core/utils';
import { Page } from '../../core/Page';

export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState(this.storageTableName));

    store.subscribe(state => {
      storage(this.storageTableName, state);
    });

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
      storageTableName: this.storageTableName,
    });

    return this.excel.getRoot();
  }

  get storageTableName() {
    return `excel:${this.params}`;
  }

  afterRender() {
     this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}