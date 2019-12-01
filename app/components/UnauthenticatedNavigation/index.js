import React from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderLink from '../Header/HeaderLink';
import messages from '../Header/messages';

export function UnauthenticatedNavigation() {
  return (
    <span>
      <HeaderLink to="/">
        <FormattedMessage {...messages.home} />
      </HeaderLink>
      <HeaderLink to="/login">
        <FormattedMessage {...messages.login} />
      </HeaderLink>
      <HeaderLink to="/signup">
        <FormattedMessage {...messages.signup} />
      </HeaderLink>
    </span>
  );
}
