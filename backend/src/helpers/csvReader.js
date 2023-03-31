const fs = require('fs');
const { parse } = require('csv-parse');

const products = [];

fs.createReadStream('./src/helpers/csv_files/products.csv')
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

  // https://sebhastian.com/read-csv-javascript/