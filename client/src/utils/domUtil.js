import $ from 'jquery';

export const getInputValue = elementId => {
  return document.getElementById(`${elementId}`).value;
};

export const getSelectValue = elementId => {
  return $(`#${elementId}`).children('option:selected').val();
};

export const setFieldsFromInput = (object, list, suffix='') => {
  for (let field of list) {
    object[field] = getInputValue(field+suffix);
  }
};

export const setFieldsFromSelect = (object, list, suffix='') => {
  for (let field of list) {
    object[field] = getSelectValue(field+suffix);
  }
};

export const setCheckedIfTrue = (checkbox, bool) => {
  if (bool) {
    checkbox.setAttribute('checked', '');
  }
};