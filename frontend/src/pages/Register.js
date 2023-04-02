import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  return (
    <section>
      <form>
        <label htmlFor="username">
          Nome:
          <input type="text" name="username" />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" />
        </label>
        <label htmlFor="password">
          Senha:
          <input type="password" name="password" />
        </label>
        <label htmlFor="address">
          Endereço:
          <input type="address" name="address" />
        </label>
        <button type="button" onClick={ () => navigate('/login') }>
          Voltar
        </button>
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}

export default Register;
