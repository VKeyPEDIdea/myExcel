const configBtns = [
  {
    iconName: 'delete',
    btnAction: 'delete',
  },
  {
    iconName: 'exit_to_app',
    btnAction: 'exitToDashboard',
  },
];

function createBtn(config) {
  return `
  <div class="btn" data-btn-action="${config.btnAction}">  
    <i class="material-icons">${config.iconName}</i>
  </div>
  `;
}

export function createHeaderBtn() {
  return configBtns.map(createBtn).join('');
}