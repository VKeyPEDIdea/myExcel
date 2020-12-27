import { storage } from '../../core/utils';

const defaultState = {
  tableTitle: 'Новая таблица',
  rowState: {},
  colState: {},
  dataState: {},
  styleState: {}
}

export const initialState = storage('excelState') ? storage('excelState') : defaultState;