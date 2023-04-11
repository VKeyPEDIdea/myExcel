import './scss/index.scss';
import { Router } from './core/routes/Router';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ExcelPage } from './pages/table/ExcelPage';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage,
});