import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';
import shopperLogo from '../images/shopperLogoForNavbar.png';

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
    <nav className="bg-gray-400 flex justify-between items-center h-10 rounded-lg shadow-lg fixed w-full z-10 opacity-95">
      <img
        src={shopperLogo}
        alt="shopper-logo"
        className="w-28 h-7 pl-3"
      />
      <ul className="flex w-7/12 sm:w-2/5 lg:w-1/3 justify-around h-full">
        {userRole && userRole === 'customer' && (
          <li className="h-full flex items-center">
            <Link to="/products" className="text-sm">
              Produtos
            </Link>
          </li>
        )}
          <li className="h-full flex items-center">
          <Link to="/orders" className="text-sm">
            Pedidos
          </Link>
        </li>
        <li className="h-full flex items-center">
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm"
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
