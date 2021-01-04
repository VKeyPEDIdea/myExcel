import { Page } from '@core/Page';
import { Dom } from '../../core/dom';
import { getTableList } from './dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const tableId = Date.now();
    const root = Dom.createDomElement('div', 'db');
    root.html = 
    `<div class="db__header">Excel dashboard</div>
    <div class="db__new-doc">
      <div class="db__container">
        <a href="#excel/${tableId}" class="db__create-new">Новая таблица</a>
      </div>
    </div>
    ${getTableList()}
    `
    return root;
  }
}