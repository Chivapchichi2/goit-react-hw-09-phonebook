import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Notification from '../Notification';
import Section from '../Section';
import MyLoader from '../MyLoader';

import contactsOperations from '../../redux/contacts/contacts-operations';
import contactsSelectors from '../../redux/contacts/contacts-selectors';

export default function Contacts() {
  const filter = useSelector(contactsSelectors.getContactsFilter);
  const items = useSelector(contactsSelectors.getContactsItems);
  const loading = useSelector(contactsSelectors.getContactsLoading);
  const dispatch = useDispatch();

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  const cleanFilter = filter.toLowerCase();
  const filteredContacts = items
    .filter(item => item.name.toLowerCase().includes(cleanFilter))
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <Section title="Phone book">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        {loading && <MyLoader />}
        {items[0] ? <Filter /> : <Notification message="No contacts added" />}
        {items[0] && !filteredContacts[0] && (
          <Notification message="No contact found" />
        )}
        {filteredContacts[0] && <ContactList contacts={filteredContacts} />}
      </Section>
    </>
  );
}
