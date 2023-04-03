import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShopperContext from './ShopperContext';

function ShopperProvider({ children }) {
  const [userInfos, setUserInfos] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getUserFromStorage = () => {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        return setUserInfos(parsedUser);
      }
    };
    getUserFromStorage();
  }, []);

  const globalState = useMemo(() => ({
    userInfos,
    setUserInfos,
    isLoading,
    setIsLoading,
    cart,
    setCart,
  }), [isLoading, userInfos, cart]);

  return (
    <ShopperContext.Provider value={ globalState }>
      {children}
    </ShopperContext.Provider>
  );
}

ShopperProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ShopperProvider;
