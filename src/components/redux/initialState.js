import { storage } from '../../core/utils';

const defaultState = {
  tableTitle: 'Новая таблица',
  rowState: {},
  colState: {},
  dataState: {},
  styleState: {},
};

export function initialState(key) {
  return storage(key) ? storage(key) : defaultState;
}