export function isShouldResize(event) {
  return event.target.dataset.resize;
}

export function isShouldSelect(event) {
  return event.target.dataset.cellAddress;
}