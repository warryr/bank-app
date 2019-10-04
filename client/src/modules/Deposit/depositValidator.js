import { validateFields, numericFieldAmount, requiredField } from 'src/utils/validationUtil'

const getValidationRules = (deposit) => [
  () => requiredField(deposit.depositAmount, 'depositAmount', numericFieldAmount, 50),
  () => requiredField(deposit.depositStartDate, 'depositStartDate'),
]

const validate = (deposit, setValidation) => {
  let validationResult = validateFields(...getValidationRules(deposit))
  setValidation(validationResult)
  return validationResult.valid
}

export default validate
