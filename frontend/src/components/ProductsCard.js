import React from 'react';
import PropTypes from 'prop-types';

function ProductsCard({ id, name, price, qtyStock }) {
  return (
    <div>
      <p>{id}</p>
      <p>{name}</p>
      <p>{price}</p>
      <p>{qtyStock}</p>
    </div>
  );
}

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  qtyStock: PropTypes.number.isRequired,
};

export default ProductsCard;
