export function getTargetBtn(event) {
  return event.target.closest('div[data-btn-action]') || event.target;
}