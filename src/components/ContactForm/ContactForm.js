import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import contactsOperations from '../../redux/contacts/contacts-operations';
import contactsSelectors from '../../redux/contacts/contacts-selectors';

import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const items = useSelector(contactsSelectors.getContactsItems);

  const handleInputChange = ({ target }) => {
    const { value } = target;
    if (target.name === 'name') {
      setName(value);
    }
    if (target.name === 'number') {
      setNumber(value);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const nameToLowerCase = name.toLowerCase();
    if (items.some(item => item.name.toLowerCase() === nameToLowerCase)) {
      // eslint-disable-next-line
      return alert(
        `${nameToLowerCase
          .split(' ')
          .map(string => string.charAt(0).toUpperCase() + string.slice(1))
          .join(
            ' ',
          )} is already in contacts. Change contact's name or delete old.`,
      );
    }
    setName('');
    setNumber('');
    return dispatch(
      contactsOperations.addContact({ name: nameToLowerCase, number }),
    );
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.ContactForm}>
      <label className={styles.label}>
        Name:
        <input
          className={styles.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={handleInputChange}
          placeholder="Ivanov Ivan (ivanov ivan)"
        />
      </label>
      <label className={styles.label}>
        Number:
        <input
          className={styles.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={handleInputChange}
          placeholder="099 123 45 67 (099-123-45-67)"
        />
      </label>
      <button type="submit" className={styles.button}>
        Add Contact
      </button>
    </form>
  );
}
