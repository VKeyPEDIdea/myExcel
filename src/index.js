import { Excel } from './components/excel/Excel';
import { Formula } from './components/formula/Formula';
import { Header } from './components/header/Header';
import { initialState } from './components/redux/initialState';
import { rootReducer } from './components/redux/rootReducer';
import { Table } from './components/table/Table';
import { Toolbar } from './components/toolbar/Toolbar';
import { createStore } from './core/createStore';
import { storage } from './core/utils';
import './sass/index.sass';

const store = createStore(rootReducer, initialState);

store.subscribe(state => {
  storage('excelState', state);
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store: store,
});

excel.render();