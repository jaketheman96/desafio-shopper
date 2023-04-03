const formatingDate = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const fullDate = date.toLocaleDateString('pt-br', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return fullDate;
};

module.exports = { formatingDate };
