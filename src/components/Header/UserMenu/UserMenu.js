import { useDispatch, useSelector } from 'react-redux';

import authOperations from '../../../redux/auth/auth-operations';
import authSelectors from '../../../redux/auth/auth-selectors';

import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();

  const name = useSelector(authSelectors.getUserName);

  const onLogout = dispatch(authOperations.logout);
  return (
    <div className={styles.UserMenu}>
      <span>Welcome, {name}</span>
      <button type="button" onClick={onLogout} className={styles.button}>
        Logout
      </button>
    </div>
  );
}
