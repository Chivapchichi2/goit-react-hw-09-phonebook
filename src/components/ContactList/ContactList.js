import PropTypes from 'prop-types';

import Contact from './Contact';

import styles from './ContactList.module.css';

export default function ContactList({ contacts }) {
  let letter = '';

  const shouldWriteLetter = name => {
    if (name.charAt(0).toUpperCase() !== letter) {
      letter = name.charAt(0).toUpperCase();
      return true;
    }
    return false;
  };

  return (
    <ul className={styles.ContactList}>
      {contacts.map(({ id, name, number }) => (
        <div key={id}>
          {shouldWriteLetter(name) && (
            <p key={letter} className={styles.letter}>
              {letter}
            </p>
          )}
          <Contact id={id} name={name} number={number} />
        </div>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
