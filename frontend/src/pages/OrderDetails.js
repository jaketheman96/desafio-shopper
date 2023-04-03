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
  const [isConfirmedBtnDisabled, setIsConfirmedBtnDisabled] = useState(false);
  const [isDeliveringBtnDisabled, setIsDeliveringBtnDisabled] = useState(false);
  const [isDeliveredBtnDisabled, setIsDeliveredBtnDisabled] = useState(false);

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
        if (order.message) return console.log(order.message);
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

  useEffect(() => {
    const handleButtonsDisabled = () => {
      if (orderDetails) {
        switch (orderDetails.status) {
        case 'Pendente':
          setIsDeliveredBtnDisabled(true);
          setIsDeliveringBtnDisabled(true);
          setIsConfirmedBtnDisabled(false);
          break;
        case 'Confirmado':
          setIsConfirmedBtnDisabled(true);
          setIsDeliveringBtnDisabled(false);
          setIsDeliveredBtnDisabled(true);
          break;
        case 'A caminho':
          setIsConfirmedBtnDisabled(true);
          setIsDeliveringBtnDisabled(true);
          setIsDeliveredBtnDisabled(false);
          break;
        default:
          setIsConfirmedBtnDisabled(true);
          setIsDeliveringBtnDisabled(true);
          setIsDeliveredBtnDisabled(true);
          break;
        }
      }
    };
    handleButtonsDisabled();
  }, [orderDetails]);

  const handleAllDeliveryButtons = async ({ target }) => {
    setOrderDetails({ ...orderDetails, status: target.value });
    const payload = {
      status: target.value,
    };
    await handleAllFetchMethods(`/sales/${id}`, 'PUT', payload, userInfos.token);
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
          {userInfos && userInfos.role === 'employee' && (
            <>
              <button
                type="button"
                name="confirmed"
                value="Confirmado"
                onClick={ handleAllDeliveryButtons }
                disabled={ isConfirmedBtnDisabled }
              >
                Pedido confirmado
              </button>
              <button
                type="button"
                name="delivering"
                value="A caminho"
                onClick={ handleAllDeliveryButtons }
                disabled={ isDeliveringBtnDisabled }
              >
                Enviar pedido
              </button>
            </>
          )}
          {userInfos && userInfos.role === 'customer' && (
            <button
              type="button"
              name="delivered"
              value="Entregue"
              onClick={ handleAllDeliveryButtons }
              disabled={ isDeliveredBtnDisabled }
            >
              Pedido entregue
            </button>
          )}
          <button type="button" onClick={ () => navigate('/orders') }>
            Voltar
          </button>
        </section>
      )}
    </>
  );
}

export default OrderDetails;
