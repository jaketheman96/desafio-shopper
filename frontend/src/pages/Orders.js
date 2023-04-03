import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OrdersCard from '../components/OrdersCard';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function Orders() {
  const { userInfos } = useContext(ShopperContext);
  const [allUserOrders, setAllUserOrders] = useState([]);
  const [showError, setShowError] = useState('');

  useEffect(() => {
    const getUserOrders = async () => {
      if (userInfos) {
        const orders = await handleAllFetchMethods(
          `/sales/user/${userInfos.id}`,
          'GET',
          null,
          userInfos.token,
        );
        if (orders.message) return setShowError(orders.message);
        return setAllUserOrders(orders);
      }
    };
    getUserOrders();
  }, [userInfos]);

  return (
    <>
      <Navbar />
      <section>
        {allUserOrders.length !== 0 && allUserOrders.map((order, index) => (
          <OrdersCard
            key={ order.id }
            index={ index }
            id={ order.id }
            saleDate={ order.saleDate }
            status={ order.status }
            totalPrice={ order.totalPrice }
          />
        ))}
      </section>
      <p>{showError}</p>
    </>
  );
}

export default Orders;
