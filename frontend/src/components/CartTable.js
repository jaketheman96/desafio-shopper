import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopperContext from '../context/ShopperContext';

function CartTable() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(ShopperContext);

  const handleRemoveButton = ({ target }) => {
    const newCart = cart.filter((item) => item.id !== Number(target.id));
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
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
      <button type="button" onClick={ () => navigate('/products') }>
        Voltar
      </button>
      <button type="button">
        Continuar
      </button>
    </section>
  );
}

export default CartTable;
