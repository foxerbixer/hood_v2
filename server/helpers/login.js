import validator from 'validator'
import _ from 'lodash'

const validateLoginInput = data => {
  let errors = {}

  data.email = !_.isEmpty(data.email) ? data.email : ''
  data.password = !_.isEmpty(data.password) ? data.password : ''

  // EMAIL
  if (!validator.isEmail(data.email))  errors.email = 'Email is invalid'
  if (validator.isEmpty(data.email))  errors.email = 'Email is required'

  // PASSWORD
  if (!validator.isLength(data.password, { min: 6, max: 25 })) {
    errors.password = 'Password must be between 6 and 25'
  }
  if (validator.isEmpty(data.password))  errors.password = 'Password is required'


  return {
    errors,
    isValid: _.isEmpty(errors)
  }
} 

export default validateLoginInput