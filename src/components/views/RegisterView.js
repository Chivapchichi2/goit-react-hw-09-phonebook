import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import authOperations from '../../redux/auth/auth-operations';

import styles from './RegisterView.module.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    if (target.name === 'name') {
      setName(target.value);
    }
    if (target.name === 'email') {
      setEmail(target.value);
    }
    if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.Register}>
      <h1>Registration</h1>
      <p>Please, fill the form</p>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
        <label className={styles.label}>
          Name
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>
        <label className={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}
