import validator from 'validator'
import _ from 'lodash'

const validateRegisterInput = data => {
  let errors = {}

  data.name = !_.isEmpty(data.name) ? data.name : ''
  data.email = !_.isEmpty(data.email) ? data.email : ''
  data.password = !_.isEmpty(data.password) ? data.password : ''
  data.password2 = !_.isEmpty(data.password2) ? data.password2 : ''
  data.avatar = !_.isEmpty(data.avatar) ? data.avatar : ''

  // NAME
  if (!validator.isLength(data.name, { min: 2, max: 15}) ) {
    errors.name = 'Name must be betweet 2 and 20 characters'
  }
  if (validator.isEmpty(data.name))  errors.name = 'Name is required'

  // EMAIL
  if (!validator.isEmail(data.email))  errors.email = 'Email is invalid'
  if (validator.isEmpty(data.email))  errors.email = 'Email is required'

  // PASSWORD
  if (!validator.isLength(data.password, { min: 6, max: 25 })) {
    errors.password = 'Password must be between 6 and 25'
  }
  if (validator.isEmpty(data.password))  errors.password = 'Password is required'

  // PASSWORD2
  if (validator.isEmpty(data.password2))  errors.password2 = 'Repeat password is required'
  if (!validator.equals(data.password, data.password2)) {
     errors.password2 = 'Password must match'
  }

  //AVATAR
  if (!validator.isEmpty(data.avatar) && !validator.isURL(data.avatar)) {
      errors.avatar = 'Image url is not valid'
  }
  
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

export default validateRegisterInput