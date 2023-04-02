import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function Products() {
  const [allProducts, setAllProducts] = useState();

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await handleAllFetchMethods('/products', 'GET', null, '');
      return setAllProducts(products);
    };
    getAllProducts();
  }, []);

  return (
    <>
      <Navbar />
      <section>
        {allProducts && allProducts.map((products) => (
          <ProductsCard
            key={ products.id }
            id={ products.id }
            name={ products.name }
            price={ products.price }
            qtyStock={ products.qtyStock }
          />
        ))}
      </section>
    </>
  );
}

export default Products;
