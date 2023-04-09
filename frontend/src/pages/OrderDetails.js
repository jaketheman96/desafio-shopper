import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';
import Navbar from '../components/Navbar';
import { formatingDate } from '../utils/formatDates';
import statusColor from '../utils/statusColor';

function OrderDetails() {
  const navigate = useNavigate();
  const { userInfos, setIsLoading } = useContext(ShopperContext);
  const [orderDetails, setOrderDetails] = useState();
  const [isConfirmedBtnDisabled, setIsConfirmedBtnDisabled] = useState(false);
  const [isDeliveringBtnDisabled, setIsDeliveringBtnDisabled] = useState(false);
  const [isDeliveredBtnDisabled, setIsDeliveredBtnDisabled] = useState(false);
  const MINIMUM_NUMBERS = 4;

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
        setIsLoading(false)
        if (order.message) return console.log(order.message);
        setOrderDetails(order);
      }
    };
    getOrderDetails();
  }, [userInfos, id, setIsLoading]);

  const formatDate = (dateToFormat) => {
    if (orderDetails) {
      return formatingDate(dateToFormat);
    }
  };

  const isScrollbarNeeded = () => {
    const THREE_PRODUCTS = 3;
    if (orderDetails.products.length <= THREE_PRODUCTS) {
      return 'justify-center';
    }
    return 'overflow-x-scroll';
  }

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
        <section className="min-h-screen pt-16 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">
            Detalhes do pedido:
          </h2>
          <article className="bg-gray-300 rounded-3xl w-full sm:w-4/5 lg:w-3/5 ease-in-out duration-200 shadow-lg">
            <div className="pb-4 h-40 flex flex-col justify-around text-center">
              <p className="text-xl font-semibold">
                {`Id do pedido: ${String(orderDetails.id).padStart(MINIMUM_NUMBERS, '0')}`}
              </p>
              <div className="flex items-center justify-center">
                <div className={`${statusColor(orderDetails.status)} w-4 h-4`} />
                <p className="ml-2 text-xl font-medium">{orderDetails.status}</p>
              </div>
              <div className="flex justify-center">
                <p className="mr-2">
                  {`Pedido: ${formatDate(orderDetails.saleDate)}`}
                </p>
                <p className="ml-2">
                  {`Entrega: ${formatDate(orderDetails.deliveryDate)}`}
                </p>
              </div>
            </div>
            <div className={`flex pb-6 ${isScrollbarNeeded()}`}>
              {orderDetails.products.map((product, index) => (
                <div
                  key={index}
                  className="bg-gray-400 flex flex-col justify-around w-52 h-52 text-center flex-shrink-0 mx-7 rounded-xl shadow-lg p-2"
                >
                  <p className="font-semibold">{`Item ${String(index + 1).padStart(2, '0')}`}</p>
                  <p>{product.name}</p>
                  <p>{`R$${product.price.replace('.', ',')}`}</p>
                  <p>
                    {`Qtd: ${product.saleProducts.quantity} unidades`}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-5 py-3">
              {userInfos && userInfos.role === 'employee' && (
                <div>
                  <button
                    type="button"
                    name="confirmed"
                    value="Confirmado"
                    onClick={handleAllDeliveryButtons}
                    disabled={isConfirmedBtnDisabled}
                    className="bg-emerald-400 rounded-lg px-2 w-20 text-sm text-black mr-2 p-0.5"
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    name="delivering"
                    value="A caminho"
                    onClick={handleAllDeliveryButtons}
                    disabled={isDeliveringBtnDisabled}
                    className="bg-emerald-400 rounded-lg px-2 w-20 text-sm text-black mr-2 p-0.5"
                  >
                    Enviar
                  </button>
                </div>
              )}
              {userInfos && userInfos.role === 'customer' && (
                <button
                  type="button"
                  name="delivered"
                  value="Entregue"
                  onClick={handleAllDeliveryButtons}
                  disabled={isDeliveredBtnDisabled}
                  className="bg-emerald-400 rounded-lg p-0.5 px-2 w-24 text-black"
                >
                  Entregue
                </button>
              )}
              <h3 className="text-xl font-medium">
                {`Total: R$${orderDetails.totalPrice.replace('.', ',')}`}
              </h3>
            </div>
          </article>
          <button
            type="button"
            onClick={() => navigate('/orders')}
            className="bg-emerald-400 rounded-lg p-0.5 px-2 w-24 text-black hover:bg-emerald-700 hover:text-white shadow-lg mt-3"
          >
            Voltar
          </button>
        </section>
      )}
    </>
  );
}

export default OrderDetails;
