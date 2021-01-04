import { storage } from "../../core/utils";

function getListItemTemplate(key) {
  const state = storage(key);
  const dateKey = Number(key.slice(6));
  const dateCreation = new Date(dateKey);
  const formatDate = dateCreation.toLocaleDateString();
  const formatTime = dateCreation.toLocaleTimeString().slice(0,5);
  return `
  <div class="db__doc-list-item">
    <a href="#excel/${dateKey}" class="title">${state.tableTitle}</a>
    <div class="date">${formatTime} ${formatDate}</div>
  </div>
  `
}

function getExcelKeysFromLS() {
  const keys = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }

    keys.push(key);
  }
  return keys;
}

export function getTableList() {
  const keys = getExcelKeysFromLS();
  if (keys.length == 0) return getEmptyMsg();

  return `
  <div class="db__doc-list db__container">
    <div class="db__doc-list-header">
      <span>Название</span>
      <span>Дата создания</span>
    </div>
    ${keys
      .map((key) => getListItemTemplate(key))
      .join('')
    }
  </div>
  `
}

function getEmptyMsg() {
  return `
  <div class="db__doc-list db__container">
    <div style="text-align: center; border: 1px solid #e6e6e6; padding: 20px; font-size: 16px;">
      Вы не создали ни одной таблицы
    </div>
  </div>
  `;
}