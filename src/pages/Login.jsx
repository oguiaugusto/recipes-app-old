import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import GeneralContext from '../context/GeneralContext';
import lightLogo from '../images/logo-light.svg';
import '../styles/login.css';

const emailRegex = (
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm
);
const MIN_PASSWORD_LENGTH = 6;

export default function Login() {
  const { user, handleUser, handleJoin } = useContext(GeneralContext);
  const history = useHistory();

  const validEmail = user.email.match(emailRegex);
  const validPassword = user.password.length > MIN_PASSWORD_LENGTH;

  return (
    <div className="login-page text-light mt-5 d-flex flex-column">
      <img
        className="logo align-self-center mb-4"
        src={ lightLogo }
        alt="recipes app logo"
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>{ 'Type your email: ' }</Form.Label>
          <Form.Control
            type="text"
            data-testid="email-input"
            placeholder="email@email.com"
            name="email"
            value={ user.email }
            onChange={ handleUser }
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>{ 'Type your password: ' }</Form.Label>
          <Form.Control
            type="password"
            data-testid="password-input"
            placeholder="*******"
            name="password"
            value={ user.password }
            onChange={ handleUser }
          />
        </Form.Group>
        <Button
          variant="outline-light"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validEmail || !validPassword }
          onClick={ () => {
            history.push('/foods');
            handleJoin();
          } }
        >
          Enter
        </Button>
      </Form>
    </div>
  );
}
