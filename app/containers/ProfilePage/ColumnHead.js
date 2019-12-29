import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import style from './style';

function ColumnHead({ children }) {
  const classes = style();
  return (
    <Grid item xs={2} className={classes.profileHeader}>
      {children}
    </Grid>
  );
}

ColumnHead.propTypes = {
  children: PropTypes.any,
};

export default ColumnHead;
