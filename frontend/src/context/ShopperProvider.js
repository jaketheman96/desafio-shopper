import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShopperContext from './ShopperContext';

function ShopperProvider({ children }) {
  const [userInfos, setUserInfos] = useState();
  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getItensFromStorage = () => {
      const user = localStorage.getItem('user');
      const storageCart = localStorage.getItem('cart');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserInfos(parsedUser);
      }
      if (storageCart) {
        const parsedCart = JSON.parse(storageCart);
        setCart(parsedCart);
      }
    };
    getItensFromStorage();
  }, []);

  useEffect(() => {
    const INITIAL_PRICE = 0;
    const handleTotalPrice = () => {
      if (cart.length !== 0) {
        const unityPrice = cart.map((item) => {
          if (item.quantity >= 1) {
            const unityPriceEach = item.quantity * Number(item.price);
            return unityPriceEach;
          }
          return INITIAL_PRICE;
        });
        const totalPrice = unityPrice.reduce(
          (acc, current) => acc + current,
          INITIAL_PRICE,
        );
        setTotalCartPrice(String(totalPrice.toFixed(2)));
      } else {
        setTotalCartPrice(INITIAL_PRICE.toFixed(2));
      }
    };
    handleTotalPrice();
  }, [cart]);

  const globalState = useMemo(() => ({
    userInfos,
    setUserInfos,
    cart,
    setCart,
    totalCartPrice,
    setTotalCartPrice,
    isLoading,
    setIsLoading,
  }), [userInfos, cart, totalCartPrice, isLoading]);

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
