const getErrorObject = (error, fieldName) => ({
  valid: false,
  error,
  fieldName: fieldName,
});

const getValidObject = fieldName => ({
  valid: true,
  error: '',
  fieldName: fieldName,
});

export const requiredField = (value, fieldName, validator, ...args) => {
  if (value === '') {                                             // || value === null || value === undefined
    return getErrorObject(`Введите значение`, fieldName)
  }
  if (validator === undefined) {
    return getValidObject(fieldName);
  }
  return validator(value, fieldName, ...args);
};

export const textFieldLength = (value, fieldName, minLength, maxLength) => {
  if(value.length < minLength || value.length > maxLength) {
    return getErrorObject(`Введите от ${minLength} до ${maxLength} символов`, fieldName)
  }
  return getValidObject(fieldName);
};

export const numericFieldInt = (value, fieldName) => {
  let valid = value === '' || /^[1-9][0-9]*$/.test(value);
  if (!valid) {
    return getErrorObject(`Введите целое положительное число`, fieldName)
  }
  return getValidObject(fieldName);
};

export const textFieldNamePattern = (value, fieldName) => {
  let valid = /^[А-Я]?[а-я]*([-\s]([А-Я]|[а-я])[а-я]*)*$/.test(value);
  if (!valid) {
    return getErrorObject(`Поле может содержать только буквы, пробелы и дефис`, fieldName)
  }
  return getValidObject(fieldName);
};

export const fieldPattern = (value, fieldName, pattern) => {
  let valid = value === '' || pattern.test(value);
  if (!valid) {
    return getErrorObject(`Введенные данные не соответствуют шаблону`, fieldName)
  }
  return getValidObject(fieldName);
};

export const validateFields = (...validators) => {
  return validators.reduce(
    (value, current) => {
      let result = current();
      if(!result.valid) {
        value.errors[result.fieldName] = result.error;
        value.valid = false;
      }
      return value;
    },
    {valid: true, errors: {}}
  )
};
