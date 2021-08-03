import { useDispatch, useSelector } from 'react-redux';

import contactsActions from '../../redux/contacts/contacts-actions';
import contactsSelectors from '../../redux/contacts/contacts-selectors';

import styles from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();

  const filter = useSelector(contactsSelectors.getContactsFilter);

  const onChange = ({ target: { value } }) =>
    dispatch(contactsActions.changeFilter(value));

  return (
    <fieldset className={styles.Filter}>
      <legend className={styles.legend}>Quickly find the right contact</legend>
      <label className={styles.label}>
        Find contacts by name
        <input
          className={styles.input}
          type="text"
          name="filter"
          value={filter}
          onChange={onChange}
        />
      </label>
    </fieldset>
  );
}
