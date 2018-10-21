import validator from 'validator'
import _ from 'lodash'

const validateEducationInput = data => {
  let errors = {}

  data.school = !_.isEmpty(data.school) ? data.school : ''
  data.degree = !_.isEmpty(data.degree) ? data.degree : ''
  data.fieldofstudy = !_.isEmpty(data.fieldofstudy) ? data.fieldofstudy : ''
  data.from = !_.isEmpty(data.from) ? data.from : ''

  // school
  if (validator.isEmpty(data.school))  errors.school = 'School is required'
  // degree
  if (validator.isEmpty(data.degree))  errors.degree = 'Degree is required'
  // fieldofstudy
  if (validator.isEmpty(data.fieldofstudy))  errors.fieldofstudy = 'Field of study is required'
  // from
  if (validator.isEmpty(data.from))  errors.from = 'From is required'

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

export default validateEducationInput