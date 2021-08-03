import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import authSelectors from '../../redux/auth/auth-selectors';
import AuthNav from './AuthNav';
import UserMenu from './UserMenu';

import styles from './Header.module.css';

export default function Header() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <header className={styles.Header}>
      <ul className={styles.list}>
        <li>
          <NavLink
            exact
            to="/"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Home
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink
              to="/contacts"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
