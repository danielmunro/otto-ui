import React from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderLink from '../Header/HeaderLink';
import messages from '../Header/messages';

export function UnauthenticatedNavigation() {
  return (
    <div>
      <div>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
      </div>
      <div>
        <HeaderLink to="/login">
          <FormattedMessage {...messages.login} />
        </HeaderLink>
      </div>
      <div>
        <HeaderLink to="/signup">
          <FormattedMessage {...messages.signup} />
        </HeaderLink>
      </div>
    </div>
  );
}
