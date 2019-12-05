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

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useInjectSaga } from '../../utils/injectSaga';
import HomePage from '../HomePage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import LogoutPage from '../LogoutPage/Loadable';
import SignupPage from '../SignupPage/Loadable';
import FeaturePage from '../FeaturePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GlobalStyle from '../../global-styles';
import PasswordResetPage from '../PasswordResetPage/Loadable';
import ViewFriendsPostsPage from '../ViewFriendsPostsPage/Loadable';
import ProtectedRoute from './ProtectedRoute';
import saga from './saga';

const key = 'app';

export default function App() {
  useInjectSaga({ key, saga });

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
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
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </Container>
  );
}
