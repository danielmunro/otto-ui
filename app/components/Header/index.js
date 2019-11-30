import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

function Header({ sessionToken }) {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        {sessionToken ? (
          <span>
            <HeaderLink to="/features">
              <FormattedMessage {...messages.features} />
            </HeaderLink>
            <HeaderLink to="/logout">
              <FormattedMessage {...messages.logout} />
            </HeaderLink>
          </span>
        ) : (
          <HeaderLink to="/login">
            <FormattedMessage {...messages.login} />
          </HeaderLink>
        )}
      </NavBar>
    </div>
  );
}

Header.propTypes = {
  sessionToken: PropTypes.string,
};

export default Header;
