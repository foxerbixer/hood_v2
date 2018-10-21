import validator from 'validator'
import _ from 'lodash'

const validateProfileInput = data => {
    let errors = {}

    data.handle = !_.isEmpty(data.handle) ? data.handle : ''
    data.status = !_.isEmpty(data.status) ? data.status : ''
    data.skills = !_.isEmpty(data.skills) ? data.skills : ''

    //handle
    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be betweet 2 and 40'
    }
    if (validator.isEmpty(data.handle)) errors.handle = 'Handle is required'

    // status
    if (validator.isEmpty(data.status)) errors.status = 'Status is required'

    // skills
    if (validator.isEmpty(data.skills)) errors.skills = 'Skills are required'

    // url
    if (!_.isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Not valid url'
        }
    }

    // soocial
    if (!_.isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'Not valid url'
        }
    }

    if (!_.isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'Not valid url'
        }
    }

    if (!_.isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'Not valid url'
        }
    }

    if (!_.isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'Not valid url'
        }
    }

    if (!_.isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not valid url'
        }
    }

    if (!_.isEmpty(data.steam)) {
        if (!validator.isURL(data.steam)) {
            errors.steam = 'Not valid url'
        }
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}

export default validateProfileInput