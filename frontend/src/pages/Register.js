import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';
import useFetch from '../hooks/useFetch';

function Register() {
  const navigate = useNavigate();
  const { setUserInfos } = useContext(ShopperContext);
  const { handleAllFetchMethods } = useFetch();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'customer',
  });

  const handleInputsChange = ({ target }) => {
    const options = {
      username: () => setUserData({ ...userData, name: target.value }),
      email: () => setUserData({ ...userData, email: target.value }),
      password: () => setUserData({ ...userData, password: target.value }),
      address: () => setUserData({ ...userData, address: target.value }),
    };
    options[target.name]();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await handleAllFetchMethods(
      '/user/register',
      'POST',
      userData,
      '',
    );
    localStorage.setItem('user', JSON.stringify(response));
    setUserInfos(response);
    navigate('/products');
  };

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="username">
          Nome:
          <input type="text" name="username" onChange={ handleInputsChange } />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" onChange={ handleInputsChange } />
        </label>
        <label htmlFor="password">
          Senha:
          <input type="password" name="password" onChange={ handleInputsChange } />
        </label>
        <label htmlFor="address">
          Endereço:
          <input type="address" name="address" onChange={ handleInputsChange } />
        </label>
        <button type="button" onClick={ () => navigate('/') }>
          Voltar
        </button>
        <button type="submit" onClick={ handleSubmit }>Entrar</button>
      </form>
    </section>
  );
}

export default Register;
