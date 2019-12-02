import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function EmailTextField({
  label,
  error,
  onChange,
  className,
  value,
  helperText,
}) {
  return (
    <TextField
      id="email"
      name="email"
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

EmailTextField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string,
  helperText: PropTypes.string,
};

export default EmailTextField;
