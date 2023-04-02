import { useState, useMemo } from 'react';
import ShopperContext from './ShopperContext';

function ShopperProvider({ children }) {
  const [firstState, setFirstState] = useState('');

  const globalState = useMemo(() => ({
    firstState,
    setFirstState,
  }), [firstState]);

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
