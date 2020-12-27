export function isActionBtn(event) {
  if (event.target.dataset.formatText || event.target.closest('div[data-format-text]')) {
    return true;
  }

  return false;;
}

export function getTargetBtn(event) {
  return event.target.closest('div[data-format-text]') || event.target;
}