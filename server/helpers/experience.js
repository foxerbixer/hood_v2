import validator from 'validator'
import _ from 'lodash'

const validateExperienceInput = data => {
  let errors = {}
  data.title = !_.isEmpty(data.title) ? data.title : ''
  data.company = !_.isEmpty(data.company) ? data.company : ''
  data.from = !_.isEmpty(data.from) ? data.from : ''

  // title
  if (validator.isEmpty(data.title))  errors.title = 'Title is required'
  // Company
  if (validator.isEmpty(data.company))  errors.company = 'Company is required'
  // from
  if (validator.isEmpty(data.from))  errors.from = 'From is required'

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

export default validateExperienceInput