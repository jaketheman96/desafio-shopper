import React from 'react';

function Login() {
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
        <button type="button">Ainda não tenho conta</button>
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}

export default Login;
