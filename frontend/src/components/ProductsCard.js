import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProductsCard({ id, name, price, qtyStock, handleQuantity }) {
  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState('');

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
        return setQuantityError('Quantidade inválida');
      }
      return setQuantityError('');
    };
    quantityValidator();
  }, [quantity, qtyStock]);

  return (
    <article className="relative text-center rounded-xl w-full sm:w-2/5 lg:w-1/5 ease-out duration-200 shadow-lg bg-gray-300 h-60 flex flex-col justify-between px-2 py-7">
      <p className="text-base">
        {name.replace('.', ',')}
      </p>
      <p className="text-base">
        {`R$${price}`.replace('.', ',')}
      </p>
      <p className="text-base">
        {`${qtyStock} unidades`}
      </p>
      <div>
        <button
          type="button"
          name="decrease"
          onClick={handleDecreaseQuantity}
          className="bg-gray-600 text-white text-base rounded-l-lg w-6 active:scale-90"
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          onChange={handleChange}
          className="w-8 text-center bg-gray-200"
        />
        <button
          type="button"
          name="increase"
          onClick={handleIncreaseQuantity}
          className="bg-gray-600 text-white text-base rounded-r-lg w-6 active:scale-90"
        >
          +
        </button>
      </div>
      <small className="absolute top-56 left-0 right-0 text-xs text-red-600 font-bold">
        {quantityError}
      </small>
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
