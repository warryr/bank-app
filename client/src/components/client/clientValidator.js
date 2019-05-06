import {
  validateFields,
  numericFieldInt,
  textFieldNamePattern,
  requiredField,
  fieldPattern,
  textFieldLength
} from '../../util/validationUtil';

const getValidationRules = client => [
  () => requiredField(client.firstName, 'firstName', textFieldNamePattern),
  () => requiredField(client.lastName, 'lastName', textFieldNamePattern),
  () => requiredField(client.patrName, 'patrName', textFieldNamePattern),
  () => requiredField(client.dateOfBirth, 'dateOfBirth'),
  () => requiredField(client.passportSeries, 'passportSeries', fieldPattern, /^[A-Za-z]{2}$/),
  () => requiredField(client.passportNumber, 'passportNumber', fieldPattern, /^\d{7}$/),
  () => requiredField(client.dateOfIssue, 'dateOfIssue'),
  () => requiredField(client.issuedBy, 'issuedBy', textFieldLength, 4, 50),
  () => requiredField(client.identNumber, 'identNumber', fieldPattern, /^\d{7}[A-Za-z]\d{3}[A-Za-z]{2}\d$/),
  () => requiredField(client.placeOfBirth, 'placeOfBirth', textFieldLength, 2, 50),
  () => fieldPattern(client.statPhoneNumber, 'statPhoneNumber', /^\d{7}$/),
  () => fieldPattern(client.mobPhoneNumber, 'mobPhoneNumber', /^\(\d{2}\)\d{7}$/),
  () => fieldPattern(client.email, 'email', /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/),
  () => requiredField(client.residenceAddress, 'residenceAddress', textFieldLength, 1, 50),
  () => requiredField(client.registrationAddress, 'registrationAddress', textFieldLength, 1, 50),
  () => numericFieldInt(client.monthlyIncome, 'monthlyIncome'),
];

const validate = (client, setValidation) => {
  let validationResult = validateFields(...getValidationRules(client));
  setValidation(validationResult);
  return validationResult.valid;
};

export default validate;
