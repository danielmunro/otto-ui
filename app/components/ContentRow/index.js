import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import style from './style';

function ContentRow({ className, children }) {
  const classes = style();
  return (
    <Grid container className={`${className} ${classes.row}`}>
      {children}
    </Grid>
  );
}

ContentRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object),
};

export default ContentRow;
