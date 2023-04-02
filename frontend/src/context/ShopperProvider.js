import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ShopperContext from './ShopperContext';

function ShopperProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const globalState = useMemo(() => ({
    isLoading,
    setIsLoading,
  }), [isLoading]);

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
