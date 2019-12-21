/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
import HomePage from '../HomePage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import LogoutPage from '../LogoutPage/Loadable';
import EditProfilePage from '../EditProfilePage/Loadable';
import ProfilePage from '../ProfilePage/Loadable';
import SignupPage from '../SignupPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GlobalStyle from '../../global-styles';
import PasswordResetPage from '../PasswordResetPage/Loadable';
import ViewFriendsPostsPage from '../ViewFriendsPostsPage/Loadable';
import WhoToFollowPage from '../WhoToFollowPage/Loadable';
import { loadSessionUser } from './actions';
import { APP_NAME } from './constants';
import ProtectedRoute from './ProtectedRoute';
import saga from './saga';
import { makeSelectSessionUserLoaded } from './selectors';
import style from './style';

const key = 'app';

function App({ userLoaded, onLoadUser }) {
  useInjectSaga({ key, saga });
  const classes = style();
  useEffect(() => {
    if (!userLoaded) {
      onLoadUser();
    }
  });
  return (
    <Container component="main" maxWidth="xl" className={classes.body}>
      <CssBaseline />
      <Helmet titleTemplate="%s - otto" defaultTitle="Community Service">
        <meta name="description" content="A community service application" />
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <h1>{APP_NAME}</h1>
          <Header />
        </Grid>
        <Grid item xs={10} className={classes.content}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile/:username" component={ProfilePage} />
            <ProtectedRoute path="/following-posts">
              <ViewFriendsPostsPage />
            </ProtectedRoute>
            <ProtectedRoute path="/suggested-follows">
              <Route path="/suggested-follows" component={WhoToFollowPage} />
            </ProtectedRoute>
            <ProtectedRoute path="/password-reset">
              <PasswordResetPage />
            </ProtectedRoute>
            <ProtectedRoute path="/edit-profile">
              <EditProfilePage />
            </ProtectedRoute>
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Grid>
      </Grid>
      <Footer />
      <GlobalStyle />
    </Container>
  );
}

App.propTypes = {
  userLoaded: PropTypes.bool,
  onLoadUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userLoaded: makeSelectSessionUserLoaded(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadUser: () => dispatch(loadSessionUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
