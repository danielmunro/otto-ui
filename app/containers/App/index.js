/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useInjectSaga } from '../../utils/injectSaga';
import HomePage from '../HomePage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import LogoutPage from '../LogoutPage/Loadable';
import ProfilePage from '../ProfilePage/Loadable';
import SignupPage from '../SignupPage/Loadable';
import FeaturePage from '../FeaturePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GlobalStyle from '../../global-styles';
import PasswordResetPage from '../PasswordResetPage/Loadable';
import ViewFriendsPostsPage from '../ViewFriendsPostsPage/Loadable';
import WhoToFollowPage from '../WhoToFollowPage/Loadable';
import { APP_NAME } from './constants';
import ProtectedRoute from './ProtectedRoute';
import saga from './saga';
import style from './style';

const key = 'app';

export default function App() {
  useInjectSaga({ key, saga });
  const classes = style();

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
            <ProtectedRoute path="/features">
              <FeaturePage />
            </ProtectedRoute>
            <ProtectedRoute path="/password-reset">
              <PasswordResetPage />
            </ProtectedRoute>
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/following-posts" component={ViewFriendsPostsPage} />
            <Route path="/suggested-follows" component={WhoToFollowPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Grid>
      </Grid>
      <Footer />
      <GlobalStyle />
    </Container>
  );
}
