import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';
import shopperImg from '../images/shopper-logo.png';

function Login() {
  const navigate = useNavigate();
  const { setUserInfos, setIsLoading } = useContext(ShopperContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showError, setShowError] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleInputsChange = ({ target }) => {
    const options = {
      email: () => setUserData({ ...userData, email: target.value }),
      password: () => setUserData({ ...userData, password: target.value }),
    };
    options[target.name]();
  };

  useEffect(() => {
    const emailValidator = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isEmailValid = userData.email.match(emailRegex);
      return isEmailValid;
    };
    const passwordValidator = () => {
      const MINIMUM_PASSWORD_LENGTH = 6;
      const isPasswordValid = userData.password.length > MINIMUM_PASSWORD_LENGTH;
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
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await handleAllFetchMethods(
      '/user/login',
      'POST',
      userData,
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
        navigate('/admin');
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
    <section className="min-h-screen flex items-center justify-center">
      <article>
        <img
          src={shopperImg}
          alt="shopper-logo"
          className="md:w-96 w-0"
        />
      </article>
      <hr className="md:h-80 md:w-0.5 md:bg-slate-900 md:mx-6 rounded" />
      <article className="flex flex-col sm:px-8 text-center">
        <h1 className="mb-7 text-3xl font-semibold">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email" className="flex flex-col">
            <p className="text-start mb-2 mx-2">
              Email:
            </p>
            <input
              type="email"
              name="email"
              onChange={handleInputsChange}
              placeholder="Ex: shopper@email.com"
              className="rounded-xl w-80 p-2 px-3 mb-8 bg-gray-800 text-white text-sm"
            />
          </label>
          <label htmlFor="password" className="flex flex-col">
            <p className="text-start mb-2 mx-2">
              Senha:
            </p>
            <input
              type="password"
              name="password"
              onChange={handleInputsChange}
              placeholder="Ex: senha123"
              className="rounded-xl p-2 w-80 px-3 mb-2 bg-gray-800 text-white text-sm"
            />
          </label>
          <small className="h-5 my-1 text-red-600">
            {showError}
          </small>
          <div className="flex justify-around">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="bg-emerald-700 rounded-lg p-0.5 px-2 w-24 text-white hover:bg-emerald-400 hover:text-black"
            >
              Registrar
            </button>
            <button
              type="submit"
              disabled={isButtonDisabled}
              onClick={handleSubmit}
              className="bg-emerald-700 rounded-lg p-0.5 px-2 w-24 text-white hover:bg-emerald-400 hover:text-black"
            >
              Entrar
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default Login;
