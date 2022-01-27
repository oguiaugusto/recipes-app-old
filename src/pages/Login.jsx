import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GeneralContext from '../context/GeneralContext';

const emailRegex = (
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm
);
const MIN_PASSWORD_LENGTH = 6;

export default function Login() {
  const { user, handleUser, handleJoin } = useContext(GeneralContext);

  const validEmail = user.email.match(emailRegex);
  const validPassword = user.password.length > MIN_PASSWORD_LENGTH;

  return (
    <div className="login-page">
      <input
        type="text"
        placeholder="Email"
        data-testid="email-input"
        name="email"
        value={ user.email }
        onChange={ handleUser }
      />
      <input
        type="password"
        placeholder="Password"
        data-testid="password-input"
        name="password"
        value={ user.password }
        onChange={ handleUser }
      />
      <Link to="/foods">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validEmail || !validPassword }
          onClick={ handleJoin }
        >
          Enter
        </button>
      </Link>
    </div>
  );
}
