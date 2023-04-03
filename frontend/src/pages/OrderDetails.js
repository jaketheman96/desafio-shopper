import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';
import Navbar from '../components/Navbar';
import { formatingDate } from '../utils/formatDates';

function OrderDetails() {
  const navigate = useNavigate();
  const { setIsLoading, userInfos } = useContext(ShopperContext);
  const [orderDetails, setOrderDetails] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const getOrderDetails = async () => {
      if (userInfos) {
        setIsLoading(true);
        const order = await handleAllFetchMethods(
          `/sales/${id}`,
          'GET',
          null,
          userInfos.token,
        );
        setIsLoading(false);
        if (order.message) return setErrorMessage(order.message);
        setOrderDetails(order);
      }
    };
    getOrderDetails();
  }, [userInfos, id, setIsLoading]);

  const formatDate = () => {
    if (orderDetails) {
      return formatingDate(orderDetails.saleDate);
    }
  };

  return (
    <>
      <Navbar />
      {orderDetails && (
        <section>
          <h2>Detalhes do pedido:</h2>
          <p>{`Id: ${String(orderDetails.id).padStart(2, '0')}`}</p>
          <p>{`Status do pedido: ${orderDetails.status}`}</p>
          <p>{`Data da compra: ${formatDate()}`}</p>
          {orderDetails.products.map((product, index) => (
            <div key={ index }>
              <p>{`Item ${String(index + 1).padStart(2, '0')} - ${product.name}`}</p>
              <p>{`Preço: R$${product.price.replace('.', ',')}`}</p>
              <p>{`Qtd: ${String(product.saleProducts.quantity).padStart(2, '0')}`}</p>
            </div>
          ))}
          <h3>{`Total: R$${orderDetails.totalPrice.replace('.', ',')}`}</h3>
          <p>{errorMessage}</p>
          <button type="button" onClick={ () => navigate('/orders') }>
            Voltar
          </button>
        </section>
      )}
    </>
  );
}

export default OrderDetails;
