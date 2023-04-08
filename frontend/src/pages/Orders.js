import React, { useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import OrdersCard from '../components/OrdersCard';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function Orders() {
  const { userInfos } = useContext(ShopperContext);
  const [allUserOrders, setAllUserOrders] = useState([]);
  const [showError, setShowError] = useState('');

  useEffect(() => {
    const userRouteByRole = () => {
      switch (userInfos.role) {
        case 'customer':
          return `/sales/user/${userInfos.id}`;
        case 'employee':
          return '/sales';
        default:
          break;
      }
    };
    const getUserOrders = async () => {
      if (userInfos) {
        const orders = await handleAllFetchMethods(
          userRouteByRole(),
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
      {allUserOrders.length !== 0  ? (
        <section>
          {allUserOrders.map((order, index) => (
            <OrdersCard
              key={order.id}
              index={index}
              id={order.id}
              saleDate={order.saleDate}
              status={order.status}
              totalPrice={order.totalPrice}
              deliveryDate={order.deliveryDate}
            />
          ))}
        </section>
      ) : <Loading />}
      <p>{showError}</p>
    </>
  );
}

export default Orders;
