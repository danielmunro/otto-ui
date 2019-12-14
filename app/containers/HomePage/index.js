/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from '../App/selectors';
import P from '../../components/P';
import { APP_NAME } from '../App/constants';
import messages from './messages';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

export function HomePage({ username, onSubmitForm }) {
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  return (
    <article>
      <Helmet>
        <title>{APP_NAME}</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <h1>
          <FormattedMessage {...messages.appHeader} />
        </h1>
        <P>Connect with friends and family. Cut out the noise.</P>
        <P>Schedule, coordinate, and host local events in your area.</P>
        <P>Share pictures and video with your followers.</P>
        <P>Find a better job and improve your life.</P>
        <P>
          Simple social networking is back in style. Give {APP_NAME} a try
          today.
        </P>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
