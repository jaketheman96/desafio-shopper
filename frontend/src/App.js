import { Route, Routes } from 'react-router-dom';
import './App.css';
import ShopperProvider from './context/ShopperProvider';
import Login from './pages/Login';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <ShopperProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </ShopperProvider>
    </div>
  );
}

export default App;
