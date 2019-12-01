import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSessionToken } from '../../containers/App/selectors';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import Banner from './banner.jpg';
import { UnauthenticatedNavigation } from '../UnauthenticatedNavigation';
import { AuthenticatedNavigation } from '../AuthenticatedNavigation';

function Header({ sessionToken }) {
  return (
    <div>
      <A href="/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        {sessionToken ? (
          <AuthenticatedNavigation />
        ) : (
          <UnauthenticatedNavigation />
        )}
      </NavBar>
    </div>
  );
}

Header.propTypes = {
  sessionToken: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  sessionToken: makeSelectSessionToken(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(Header);
