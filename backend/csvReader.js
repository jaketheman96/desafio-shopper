const fs = require('fs');
const { parse } = require('csv-parse');

const products = [];

fs.createReadStream("./products.csv")
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (row) {
    products.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log(products)
  })

  // *obs: troquei algumas vírgulas "," por pontos "." no arquivo csv, visto que a vírgula é o delimitador padrão de um arquivo csv.
  // depois será alterado no frontend.

module.exports = { products }