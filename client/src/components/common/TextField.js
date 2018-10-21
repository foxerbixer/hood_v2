import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const TextField = ({
type,
placeholder,
name,
value,
error,
info,
onChange,
disabled
}) => {
  return (
    <div className="form-group">
      <input 
        className={classnames('form-control form-control-lg', { 'is-invalid': error })}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      { info && <small className="form-text text-muted">{ info }</small> }
      { error && (<div className="invalid-feedback">{ error }</div>) } 
    </div>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

TextField.defaultProps = {
  text: 'text'
}

export default TextField
