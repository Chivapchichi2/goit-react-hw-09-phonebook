import { NavLink } from 'react-router-dom';

import styles from './AuthNav.module.css';

const AuthNav = () => (
  <ul className={styles.AuthNav}>
    <li>
      <NavLink
        to="/register"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Register
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/login"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Login
      </NavLink>
    </li>
  </ul>
);

export default AuthNav;
