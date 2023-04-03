import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function Register() {
  const navigate = useNavigate();
  const { setUserInfos, setIsLoading } = useContext(ShopperContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showError, setShowError] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'customer',
  });

  useEffect(() => {
    const nameValidator = () => {
      const MINIMUM_NAME = 3;
      const isNameValid = userData.name.length > MINIMUM_NAME;
      return isNameValid;
    };
    const emailValidator = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isEmailValid = userData.email.match(emailRegex);
      return isEmailValid;
    };
    const passwordValidator = () => {
      const MINIMUM_PASSWORD = 6;
      const isPasswordValid = userData.password.length > MINIMUM_PASSWORD;
      return isPasswordValid;
    };
    const addressValidator = () => {
      const MINIMUM_ADDRESS_LENGTH = 5;
      const isAddressValid = userData.address.length > MINIMUM_ADDRESS_LENGTH;
      return isAddressValid;
    };
    const handleButtonControl = () => {
      const isNameValid = nameValidator();
      const isEmailValid = emailValidator();
      const isPasswordValid = passwordValidator();
      const isAddressValid = addressValidator();
      if (isNameValid && isEmailValid && isPasswordValid && isAddressValid) {
        return setIsButtonDisabled(false);
      }
      return setIsButtonDisabled(true);
    };
    handleButtonControl();
  }, [userData]);

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
    setIsLoading(true);
    const response = await handleAllFetchMethods(
      '/user/register',
      'POST',
      userData,
      '',
    );
    setIsLoading(false);
    if (response.message) return setShowError(response.message);
    localStorage.setItem('user', JSON.stringify(response));
    setUserInfos(response);
    navigate('/products');
  };

  useEffect(() => {
    const TWO_SECONDS = 2000;
    const handleTimeout = () => {
      setTimeout(() => setShowError(''), TWO_SECONDS);
    };
    handleTimeout();
  }, [showError]);

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
        <button type="submit" onClick={ handleSubmit } disabled={ isButtonDisabled }>
          Entrar
        </button>
      </form>
      <p>{showError}</p>
    </section>
  );
}

export default Register;
