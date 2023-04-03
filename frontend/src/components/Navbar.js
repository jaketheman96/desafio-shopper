import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';

function Navbar() {
  const navigate = useNavigate();
  const { setUserInfos, userInfos } = useContext(ShopperContext);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const handleUserRole = () => {
      if (userInfos) {
        setUserRole(userInfos.role);
      }
    };
    handleUserRole();
  }, [userInfos]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserInfos();
    navigate('/');
  };

  return (
    <nav>
      <ul>
        {userRole && userRole === 'customer' && (
          <li>
            <Link to="/products">Produtos</Link>
          </li>
        )}
        <li>
          <Link to="/orders">Pedidos</Link>
        </li>
        <li>
          <button type="button" onClick={ handleLogout }>
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
