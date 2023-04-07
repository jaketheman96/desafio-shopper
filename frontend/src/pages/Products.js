import React, { useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import ShopperContext from '../context/ShopperContext';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function Products() {
  const navigate = useNavigate();
  const { setCart, cart, totalCartPrice, setIsLoading } = useContext(ShopperContext);
  const [allProducts, setAllProducts] = useState();

  useEffect(() => {
    const getAllProducts = async () => {
      setIsLoading(true);
      const products = await handleAllFetchMethods('/products', 'GET', null, '');
      setIsLoading(false);
      return setAllProducts(products);
    };
    getAllProducts();
  }, [setIsLoading]);

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
      {allProducts ? (
        <section className="relative min-h-screen flex flex-wrap justify-center gap-7 px-7 py-14">
          {allProducts.map((products) => (
            <ProductsCard
              key={products.id}
              id={products.id}
              name={products.name}
              price={products.price}
              qtyStock={products.qtyStock}
              handleQuantity={handleQuantity}
            />
          ))}
          <article className="fixed bottom-1 right-3">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="bg-emerald-400 p-2 rounded-lg opacity-70 hover:bg-emerald-700 hover:text-white"
            >
              <p>
                {`Total: R$${totalCartPrice.replace('.', ',')}`}
              </p>
            </button>
          </article>
        </section>
      ) : <Loading />}
    </>
  );
}

export default Products;
