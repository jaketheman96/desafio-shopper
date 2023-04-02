import { Route, Routes } from 'react-router-dom';
import './App.css';
import ShopperProvider from './context/ShopperProvider';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <ShopperProvider>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/products" element={ <Products /> } />
          <Route path="/orders" element={ <Orders /> } />
        </Routes>
      </ShopperProvider>
    </div>
  );
}

export default App;
