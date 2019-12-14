import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSessionUsername } from '../../containers/App/selectors';
import HeaderLink from '../Header/HeaderLink';
import messages from '../Header/messages';

function AuthenticatedNavigation({ username }) {
  return (
    <div>
      <div>
        <HeaderLink to="/following-posts">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
      </div>
      <div>
        <HeaderLink to={`/profile/${username}`}>
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

AuthenticatedNavigation.propTypes = {
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectSessionUsername(),
});

export function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AuthenticatedNavigation);
