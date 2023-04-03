import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function Products() {
  const navigate = useNavigate();
  const { setCart, cart, totalCartPrice } = useContext(ShopperContext);
  const [allProducts, setAllProducts] = useState();

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await handleAllFetchMethods('/products', 'GET', null, '');
      return setAllProducts(products);
    };
    getAllProducts();
  }, []);

  const handleQuantity = (productId, quantity) => {
    const product = allProducts.find((item) => item.id === productId);
    const productCart = { ...product, quantity };
    const isNewProduct = !cart.some((item) => item.id === productId);
    if (isNewProduct) {
      const newCart = [...cart, productCart];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      const newCart = cart.filter((item) => {
        if (item.id === productId) {
          item.quantity = quantity;
        }
        if (item.id === productId && item.quantity === 0) {
          return item.id !== productId;
        }
        return item;
      });
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

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
            handleQuantity={ handleQuantity }
          />
        ))}
        <article>
          <p>{`Total: R$${totalCartPrice.replace('.', ',')}`}</p>
          <button type="button" onClick={ () => navigate('/cart') }>
            Ir para o carrinho
          </button>
        </article>
      </section>
    </>
  );
}

export default Products;
