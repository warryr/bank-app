export const getInputValue = elementId => {
  return document.getElementById(`${elementId}`).value;
};

export const createObjectFromInput = map => {
  const object = {};
  for (let key in map) {
    if (map.hasOwnProperty(key)) {
      object[key] = getInputValue(map[key]);
    }
  }
  return object;
};

export const selectOptionByValue = (select, value) => {
  const options = select.options;
  for (let i = 0; i < options.length; i++) {
    if (value === options[i].value) {
      return i;
    }
  }
};

export const checkIfTrue = (checkbox, bool) => {
  if (bool) {
    checkbox.setAttribute('checked', '');
  }
};