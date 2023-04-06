import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProductsCard({ id, name, price, qtyStock, handleQuantity }) {
  const [quantity, setQuantity] = useState(0);
  const [showQuantityError, setShowQuantityError] = useState(false);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    handleQuantity(id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 0) return setQuantity(0);
    setQuantity(quantity - 1);
    handleQuantity(id, quantity - 1);
  };

  const handleChange = ({ target }) => {
    const inputValue = Number(target.value);
    if (Number.isNaN(inputValue)) {
      return setQuantity(1);
    }
    setQuantity(Number(target.value));
    handleQuantity(id, Number(target.value));
  };

  useEffect(() => {
    const quantityValidator = () => {
      if (quantity > qtyStock) {
        return setShowQuantityError(true);
      }
      return setShowQuantityError(false);
    };
    quantityValidator();
  }, [quantity, qtyStock]);

  return (
    <article>
      <p>{name.replace('.', ',')}</p>
      <p>{`${qtyStock} unidades`}</p>
      <p>{`R$${price}`.replace('.', ',')}</p>
      <button type="button" name="increase" onClick={ handleIncreaseQuantity }>
        +
      </button>
      <input type="text" value={ quantity } onChange={ handleChange } />
      <button type="button" name="decrease" onClick={ handleDecreaseQuantity }>
        -
      </button>
      {showQuantityError && <small>Quantidade inválida</small>}
    </article>
  );
}

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  qtyStock: PropTypes.number.isRequired,
  handleQuantity: PropTypes.func.isRequired,
};

export default ProductsCard;
