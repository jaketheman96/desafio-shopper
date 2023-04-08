import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';
import { BsFillCartDashFill } from 'react-icons/bs'

function CartTable() {
  const navigate = useNavigate();
  const [deliveryDate, setDeliveryDate] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    cart,
    setCart,
    totalCartPrice,
    userInfos,
    setIsLoading,
  } = useContext(ShopperContext);

  const handleRemoveButton = ({ currentTarget }) => {
    const newCart = cart.filter((item) => item.id !== Number(currentTarget.id));
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleSubmitCart = async () => {
    setIsLoading(true)
    const payload = {
      userId: Number(userInfos.id),
      saleDate: new Date(),
      status: 'Pendente',
      products: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
      totalPrice: Number(totalCartPrice),
      deliveryDate,
    };
    await handleAllFetchMethods(
      '/sales',
      'POST',
      payload,
      userInfos.token,
    );
    setIsLoading(false)
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/orders');
  };

  const handleDateChange = ({ target }) => {
    setDeliveryDate(target.value);
  };

  useEffect(() => {
    const buttonControl = () => {
      const todaysDate = new Date();
      const dateDelivery = new Date(deliveryDate);
      if (!deliveryDate || dateDelivery < todaysDate) {
        return setIsButtonDisabled(true);
      }
      setIsButtonDisabled(false);
    };
    buttonControl();
  }, [deliveryDate]);

  return (
    <section className="min-h-screen pt-14 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">
        Carrinho:
      </h1>
      <article className="bg-gray-300 h-96 overflow-scroll w-full rounded-2xl px-3 sm:w-4/5 lg:w-3/5 shadow-lg">
        <table className="w-full border-separate border-spacing-4 border-slate-500">
          <thead>
            <tr>
              <th className="text-lg font-semibold">N°</th>
              <th className="text-lg font-semibold">Nome</th>
              <th className="text-lg font-semibold">Preço</th>
              <th className="text-lg font-semibold">Qntd</th>
              <th className="text-lg font-semibold">Remover</th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="text-sm">
                  {String(index + 1).padStart(2, '0')}
                </td>
                <td className="text-sm">
                  {item.name}
                </td>
                <td className="text-sm">
                  {`R$${String(item.price).replace('.', ',')}`}
                </td>
                <td className="text-sm">
                  {item.quantity}
                </td>
                <td>
                  <button
                    type="button"
                    id={item.id}
                    onClick={handleRemoveButton}
                  >
                    <BsFillCartDashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <article className="flex justify-between w-full sm:w-4/5 lg:w-3/5 p-3">
        <label htmlFor="delivery-date" className="text-lg">
          {`Data para a entrega: `}
          <input
            type="date"
            name="delivery-date"
            onChange={handleDateChange}
            className="rounded-md pl-2 text-base shadow-lg bg-gray-100"
          />
        </label>
        <p className="text-lg">
          {`Total: R$${totalCartPrice.replace('.', ',')}`}
        </p>
      </article>
      <article className="flex justify-end w-full sm:w-4/5 lg:w-3/5">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="bg-emerald-400 rounded-lg p-0.5 px-2 w-24 text-black hover:bg-emerald-700 hover:text-white shadow-lg"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmitCart}
          disabled={isButtonDisabled}
          className="bg-emerald-400 rounded-lg p-0.5 px-2 w-24 text-black hover:bg-emerald-700 hover:text-white ml-2 sm:ml-4 shadow-lg"
        >
          Continuar
        </button>
      </article>
    </section>
  );
}

export default CartTable;
