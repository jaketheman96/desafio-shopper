const formatingDate = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const fullDate = date.toLocaleDateString('pt-br', { timeZone: 'UTC' });
  return fullDate;
};

module.exports = { formatingDate };
