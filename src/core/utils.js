export function capitalizeFirstLetter(string) {
  if (typeof string !== 'string') return '';

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * framework storage function. Get or set value to localStorage.
 * Put some data to second attribute to set value.
 * Put only key attribute to get value by this key.
 * @param {string} key Key object of localStorage cell
 * @param {*} data Data to storage
 */
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
  return true;
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
}