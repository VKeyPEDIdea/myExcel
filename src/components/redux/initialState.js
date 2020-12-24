import { storage } from '../../core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  styleState: {}
}

export const initialState = storage('excelState') ? storage('excelState') : defaultState;