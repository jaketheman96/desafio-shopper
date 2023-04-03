import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import ShopperContext from './context/ShopperContext';
import Cart from './pages/Cart';
import Login from './pages/Login';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  const { isLoading } = useContext(ShopperContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/products" element={ <Products /> } />
        <Route path="/orders" element={ <Orders /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/orders/:id" element={ <OrderDetails /> } />
      </Routes>
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
