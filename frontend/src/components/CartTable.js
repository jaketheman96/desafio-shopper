import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function CartTable() {
  const navigate = useNavigate();
  const {
    cart,
    setCart,
    totalCartPrice,
    userInfos,
    setIsLoading,
  } = useContext(ShopperContext);

  const handleRemoveButton = ({ target }) => {
    const newCart = cart.filter((item) => item.id !== Number(target.id));
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleSubmitCart = async () => {
    const payload = {
      userId: Number(userInfos.id),
      saleDate: new Date(),
      status: 'Pendente',
      products: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
      totalPrice: Number(totalCartPrice),
    };
    setIsLoading(true);
    await handleAllFetchMethods(
      '/sales',
      'POST',
      payload,
      userInfos.token,
    );
    localStorage.removeItem('cart');
    setCart([]);
    setIsLoading(false);
    navigate('/orders');
  };

  return (
    <section>
      <h1>Carrinho:</h1>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.map((item, index) => (
            <tr key={ index }>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  type="button"
                  id={ item.id }
                  onClick={ handleRemoveButton }
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{`Total: R$${totalCartPrice.replace('.', ',')}`}</p>
      <button type="button" onClick={ () => navigate('/products') }>
        Voltar
      </button>
      <button type="button" onClick={ handleSubmitCart }>
        Continuar
      </button>
    </section>
  );
}

export default CartTable;
