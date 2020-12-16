import { Excel } from './components/excel/Excel';
import { Formula } from './components/formula/Formula';
import { Header } from './components/header/Header';
import { rootReducer } from './components/redux/rootReducer';
import { Table } from './components/table/Table';
import { Toolbar } from './components/toolbar/Toolbar';
import { createStore } from './core/createStore';
import { storage } from './core/utils';
import './sass/index.sass';

const store = createStore(rootReducer, storage('excelState'));

store.subscribe(state => {
  console.log('App state', state);
  storage('excelState', state);
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store: store,
});

excel.render();