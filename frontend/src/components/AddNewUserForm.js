import React, { useState } from 'react';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function AddNewUserForm() {
  const [newUserInfos, setNewUserInfos] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    address: '',
  });

  const handleChanges = ({ target }) => {
    const options = {
      username: () => setNewUserInfos({ ...newUserInfos, name: target.value }),
      email: () => setNewUserInfos({ ...newUserInfos, email: target.value }),
      password: () => setNewUserInfos({ ...newUserInfos, password: target.value }),
      role: () => setNewUserInfos({ ...newUserInfos, role: target.value }),
      address: () => setNewUserInfos({ ...newUserInfos, address: target.value }),
    };
    options[target.name]();
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    await handleAllFetchMethods(
      '/user/register',
      'POST',
      newUserInfos,
      '',
    );
    window.location.reload();
  };

  return (
    <article>
      <h2>Adicionar novo usuário</h2>
      <form onSubmit={ handleSubmitForm }>
        <label htmlFor="username">
          Nome:
          <input type="text" name="username" onChange={ handleChanges } />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" onChange={ handleChanges } />
        </label>
        <label htmlFor="password">
          Senha:
          <input type="password" name="password" onChange={ handleChanges } />
        </label>
        <label htmlFor="role">
          Tipo:
          <select name="role" onChange={ handleChanges }>
            <option value="customer">Cliente</option>
            <option value="employee">Funcionário</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label>
          Endereço do cliente:
          <input type="text" name="address" />
        </label>
        <button type="submit" onClick={ handleSubmitForm }>
          Registrar
        </button>
      </form>
    </article>
  );
}

export default AddNewUserForm;
