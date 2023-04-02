import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <section>
      <form>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" />
        </label>
        <button type="button" onClick={ () => navigate('/register') }>
          Ainda não tenho conta
        </button>
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}

export default Login;
