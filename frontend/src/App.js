import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
