import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatingDate } from '../utils/formatDates';
import statusColor from '../utils/statusColor';

function OrdersCard({ index, id, status, totalPrice, deliveryDate }) {
  const fullDate = formatingDate(deliveryDate);
  const TWO_ZEROS = 2;

  return (
    <article className="border-2 border-gray-500 text-center h-44 rounded-xl bg-gray-300 shadow-lg w-full sm:w-2/6 lg:w-1/5 p-3 lg:h-56 hover:scale-105 ease-in-out duration-300">
      <Link to={`/orders/${id}`} className="h-full flex flex-col justify-around">
        <p className="font-semibold">
          {`Pedido: ${String(index + 1).padStart(TWO_ZEROS + 1, '0')}`}
        </p>
        <div className="flex items-center justify-center">
          <div className={statusColor(status)} />
          <p className="ml-2">{status}</p>
        </div>
        <p>{`R$${totalPrice.replace('.', ',')}`}</p>
        <p>{`Entrega: ${fullDate}`}</p>
      </Link>
    </article>
  );
}

OrdersCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryDate: PropTypes.string.isRequired,
};

export default OrdersCard;
