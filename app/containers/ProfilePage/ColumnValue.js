import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

function ColumnValue({ children }) {
  return (
    <Grid item xs={10}>
      {children}
    </Grid>
  );
}

ColumnValue.propTypes = {
  children: PropTypes.any,
};

export default ColumnValue;
