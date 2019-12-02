import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function PasswordTextField({
  id = 'password',
  name = 'password',
  label,
  error,
  onChange,
  className,
  value,
  helperText,
}) {
  return (
    <TextField
      id={id}
      type="password"
      name={name}
      required
      label={label}
      className={className}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
}

PasswordTextField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string,
  helperText: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default PasswordTextField;
