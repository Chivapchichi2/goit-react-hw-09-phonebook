import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import authOperations from '../redux/auth/auth-operations';
import Container from './Container';
import Header from './Header';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MyLoader from './MyLoader';

const ContactsView = lazy(() =>
  import('./views/ContactsView' /* webpackChunkName: "contactsPage" */),
);
const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "homePage" */),
);
const RegisterView = lazy(() =>
  import('./views/RegisterView' /* webpackChunkName: "registerPage" */),
);
const LoginView = lazy(() =>
  import('./views/LoginView' /* webpackChunkName: "loginPage" */),
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Suspense fallback={<MyLoader />}>
        <Switch>
          <PublicRoute exact path="/" component={HomeView} />
          <PrivateRoute
            path="/contacts"
            component={ContactsView}
            redirectTo="/login"
          />
          <PublicRoute
            path="/register"
            component={RegisterView}
            redirectTo="/contacts"
            restricted
          />
          <PublicRoute
            path="/login"
            component={LoginView}
            redirectTo="/contacts"
            restricted
          />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Container>
  );
}
