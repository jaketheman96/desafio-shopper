import { Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Login from './pages/Login';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <div className="App bg-gray-200 min-h-screen">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/products" element={ <Products /> } />
        <Route path="/orders" element={ <Orders /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/orders/:id" element={ <OrderDetails /> } />
        <Route path="/admin" element={ <Admin /> } />
      </Routes>
    </div>
  );
}

export default App;
