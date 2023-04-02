import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function Login() {
  const navigate = useNavigate();
  const { setIsLoading } = useContext(ShopperContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showError, setShowError] = useState('');
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
  });

  const handleInputsChange = ({ target }) => {
    const options = {
      email: () => setUserInfos({ ...userInfos, email: target.value }),
      password: () => setUserInfos({ ...userInfos, password: target.value }),
    };
    options[target.name]();
  };

  useEffect(() => {
    const emailValidator = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isEmailValid = userInfos.email.match(emailRegex);
      return isEmailValid;
    };
    const passwordValidator = () => {
      const MINIMUM_PASSWORD_LENGTH = 6;
      const isPasswordValid = userInfos.password.length > MINIMUM_PASSWORD_LENGTH;
      return isPasswordValid;
    };
    const handleButtonControl = () => {
      const emailValidation = emailValidator();
      const passwordValidation = passwordValidator();
      if (emailValidation && passwordValidation) {
        return setIsButtonDisabled(false);
      }
      return setIsButtonDisabled(true);
    };
    handleButtonControl();
  }, [userInfos]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await handleAllFetchMethods(
      '/user/login',
      'POST',
      userInfos,
      '',
    );
    setIsLoading(false);
    if (response.message) return setShowError(response.message);
    localStorage.setItem('user', JSON.stringify(response));
    setUserInfos(response);
    switch (response.role) {
    case 'customer':
      navigate('/products');
      break;
    case 'employee':
      navigate('/orders');
      break;
    default:
      break;
    }
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
        <label htmlFor="email">
          Email:
          <input type="email" name="email" onChange={ handleInputsChange } />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" onChange={ handleInputsChange } />
        </label>
        <button type="button" onClick={ () => navigate('/register') }>
          Ainda não tenho conta
        </button>
        <button type="submit" disabled={ isButtonDisabled } onClick={ handleSubmit }>
          Entrar
        </button>
      </form>
      <p>{showError}</p>
    </section>
  );
}

export default Login;
