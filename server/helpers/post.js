import validator from 'validator'
import _  from 'lodash'

const validatePostInput = data => {
  let errors = {}

  data.text = !_.isEmpty(data.text) ? data.text : ''

  // text
  if (!validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = 'Text must be between 1 and 100'
  }
  if (validator.isEmpty(data.text))  errors.text = 'Text is required'


  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

export default validatePostInput