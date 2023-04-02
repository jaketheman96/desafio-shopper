import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/products">Produtos</Link>
        </li>
        <li>
          <Link to="/orders">Pedidos</Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
