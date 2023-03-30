const fs = require('fs');
const { parse } = require('csv-parse');

const products = [];

fs.createReadStream('./products.csv')
  .pipe(
    parse({
      delimiter: ',',
      columns: true,
      ltrim: true,
    }),
  )
  .on('data', (row) => {
    products.push(row);
  })
  .on('error', (error) => {
    console.log(error.message);
  })
  .on('end', () => {
    console.log(products);
  });

  // *obs: troquei algumas vírgulas "," por pontos "." no arquivo csv, visto que a vírgula é o delimitador padrão de um arquivo csv.
  // depois será alterado no frontend.
  // https://sebhastian.com/read-csv-javascript/

module.exports = { products };