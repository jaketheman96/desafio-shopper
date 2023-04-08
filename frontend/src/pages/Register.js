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
    <section className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 text-center flex flex-col py-3 px-16 rounded-xl w-screen sm:w-6/12 md:w-5/12 lg:w-96 shadow-lg shadow-gray-400/70"
      >
        <h1 className="mb-2 text-2xl font-bold">
          Registrar
        </h1>
        <label htmlFor="username">
          <p className="text-start ml-1">
            Nome:
          </p>
          <input
            type="text"
            name="username"
            onChange={handleInputsChange}
            placeholder="Ex: Matheus Silva"
            className="mb-3 w-full bg-gray-800 h-7 rounded-lg pl-3 text-white placeholder:text-xs"
          />
        </label>
        <label htmlFor="email">
          <p className="text-start ml-1">
            Email:
          </p>
          <input
            type="email"
            name="email"
            onChange={handleInputsChange}
            placeholder="Ex: shopper@email.com"
            className="mb-3 w-full bg-gray-800 h-7 rounded-lg pl-3 text-white placeholder:text-xs"
          />
        </label>
        <label htmlFor="password">
          <p className="text-start ml-1">
            Senha:
          </p>
          <input
            type="password"
            name="password"
            onChange={handleInputsChange}
            placeholder="Ex: senha123"
            className="mb-3 w-full bg-gray-800 h-7 rounded-lg pl-3 text-white placeholder:text-xs"
          />
        </label>
        <label htmlFor="address">
          <p className="text-start ml-1">
            Endereço:
          </p>
          <input
            type="address"
            name="address"
            onChange={handleInputsChange}
            placeholder="Ex: Rua Xablauland 125"
            className="w-full bg-gray-800 h-7 rounded-lg pl-3 text-white placeholder:text-xs"
          />
        </label>
        <small className="h-5 my-1 text-red-600">
          {showError}
        </small>
        <div className="flex justify-around">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-emerald-700 rounded-lg p-0.5 px-2 w-24 text-white hover:bg-emerald-400 hover:text-black"
          >
            Voltar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className="bg-emerald-700 rounded-lg p-0.5 px-2 w-24 text-white hover:bg-emerald-400 hover:text-black"
          >
            Entrar
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;
