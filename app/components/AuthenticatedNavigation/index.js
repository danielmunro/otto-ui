import React from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderLink from '../Header/HeaderLink';
import messages from '../Header/messages';

export function AuthenticatedNavigation() {
  return (
    <div>
      <div>
        <HeaderLink to="/following-posts">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
      </div>
      <div>
        <HeaderLink to="/profile">
          <FormattedMessage {...messages.myProfile} />
        </HeaderLink>
      </div>
      <div>
        <HeaderLink to="/suggested-follows">
          <FormattedMessage {...messages.suggestedFollows} />
        </HeaderLink>
      </div>
      <div>
        <HeaderLink to="/events">
          <FormattedMessage {...messages.events} />
        </HeaderLink>
      </div>
      <div>
        <HeaderLink to="/jobs">
          <FormattedMessage {...messages.jobs} />
        </HeaderLink>
      </div>
      <div>
        <HeaderLink to="/logout">
          <FormattedMessage {...messages.logout} />
        </HeaderLink>
      </div>
    </div>
  );
}
