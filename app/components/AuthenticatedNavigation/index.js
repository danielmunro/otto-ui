import React from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderLink from '../Header/HeaderLink';
import messages from '../Header/messages';

export function AuthenticatedNavigation() {
  return (
    <span>
      <HeaderLink to="/">
        <FormattedMessage {...messages.home} />
      </HeaderLink>
      <HeaderLink to="/features">
        <FormattedMessage {...messages.features} />
      </HeaderLink>
      <HeaderLink to="/logout">
        <FormattedMessage {...messages.logout} />
      </HeaderLink>
    </span>
  );
}
