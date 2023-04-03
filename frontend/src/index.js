import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ShopperProvider from './context/ShopperProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopperProvider>
        <App />
      </ShopperProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
