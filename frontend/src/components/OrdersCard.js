import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrdersCard({ index, id, status, totalPrice, saleDate }) {
  const date = new Date(saleDate);
  const fullDate = date.toLocaleDateString('pt-br', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const TWO_ZEROS = 2;

  return (
    <article>
      <Link to={ `/orders/${id}` }>
        <p>{`Pedido: ${String(index + 1).padStart(TWO_ZEROS + 1, '0')}`}</p>
        <p>{`Status: ${status}`}</p>
        <p>{`R$${totalPrice.replace('.', ',')}`}</p>
        <p>{fullDate}</p>
      </Link>
    </article>
  );
}

OrdersCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
};

export default OrdersCard;
