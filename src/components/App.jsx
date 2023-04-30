import React, { useState, useEffect } from 'react';
import ContactsList from './contacts.json';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || ContactsList
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmiHandler = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const includeName = contacts.find(user => user.name === contact.name);
    if (includeName) {
      alert(`${contact.name} is already in contacts`);
    } else {
      setContacts([contact, ...contacts]);
    }
  };

  const handelChange = e => {
    setFilter(e.target.value);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // render() {
  //   const { contacts, filter } = this.state;
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Phonebook</h1>
      <Form onSubmit={onSubmiHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handelChange} />
      <Contacts contacts={filterContacts} onDelete={handleDelete} />
    </div>
  );
};
