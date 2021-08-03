import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import contactsOperations from '../../../redux/contacts/contacts-operations';

import styles from './Contact.module.css';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const nameToUpperCaseFirstLetter = name
    .split(' ')
    .map(string => string.charAt(0).toUpperCase() + string.slice(1))
    .join(' ');

  return (
    <li className={styles.Contact}>
      <span className={styles.span}>{nameToUpperCaseFirstLetter}:</span>
      <span className={styles.span}> {number}</span>
      <button
        className={styles.button}
        type="button"
        onClick={() => dispatch(contactsOperations.deleteContact(id))}
      >
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;
