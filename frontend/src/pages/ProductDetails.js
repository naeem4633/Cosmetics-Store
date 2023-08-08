import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from '../components/Slider';
import MovingImages from '../components/MovingImages';

const ProductDetails = ({onChange}) => {
    const { id } = useParams();
    let [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      // Function to fetch the products based on the category name
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
  
      // Call the fetchProducts function when the component mounts
      fetchProduct();
    }, [id]);


    const handleAddToCart = (product) => {
        // Create the data object to be sent in the POST request
        const data = {
          product: product.id,
          is_cart: true,
          is_wishlist: false,
          quantity: quantity,
        };
      
        axios.post('http://127.0.0.1:8000/api/saveditems/create', data)
          .then((response) => {
            // Handle the response from the backend if needed
            console.log('Product added to cart successfully:', response.data);
      
            // Create a new cart item with quantity = 1
            const newCartItem = {
              id: response.data.id,
              product: product,
              is_cart: true,
              is_wishlist: false,
              quantity: quantity,
            };
      
            // Call the handleSavedItemsChange function with the newCartItem
            onChange(newCartItem);
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error adding product to cart:', error);
          });
      };    
    
      useEffect(() => {
        // Function to fetch the first 10 products using Axios
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/products');
            // Assuming the API response returns the first 10 products
            setProducts(response.data.slice(0, 10));
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);

  return (
    <section className='w-full relative flex flex-col tracking-wide mt-16'>
        <div className='mx-auto w-3/4 flex flex-row tracking-wide p-4'>
            <div className='w-1/2 flex flex-col'>
                <div className='h-[60vh]'>
                    <img className='w-full h-4/5 border border-black'></img>
                    <div className='h-1/5 border border-black'>
                        <MovingImages products={products} />
                    </div>
                </div>
            </div>
            <div className='w-1/2 flex flex-col sapce-y-4'>
              <div className='w-3/4'>
                <div className='w-full p-4 space-y-2'>
                    <p className='text-2xl'>{product.name}</p>
                    <p className='text-gray-500'>0 reviews</p>
                </div>
                <div className='w-full p-4 space-y-2'>
                    <p className='text-xl font-bold'>$ {product.price}</p>
                </div>
                <div className='w-full p-4'>
                    <p className='text-gray-500'>$2.0 on credit</p>
                    <p className='text-sm'>Shopping limit for new users: $10 - $50</p>
                </div>
                <div className='w-full p-4 space-y-2'>
                  <div className='p-3 border border-[#c82f7e]'>Select your Shade / Size</div>
                    <div className='flex flex-row items-center'>
                      <div onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}  className='w-12 h-12 color-secondary flex items-center justify-center cursor-pointer hover:bg-[#96205d] transition-all duration-200'>
                          <img src='../static/images/minus.png' className='w-6 h-6'></img>
                      </div>
                      <p className='w-16 h-12 text-xl text-center pt-2.5 border border-[#c82f7e]'>{quantity}</p>
                      <div onClick={() => setQuantity(quantity + 1)}  className='w-12 h-12 color-secondary flex items-center justify-center cursor-pointer hover:bg-[#96205d] transition-all duration-200'>
                          <img src='../static/images/plus.png' className='w-6 h-6'></img>
                      </div>
                  </div>
                </div>
                <div className='w-full p-4 space-y-2'>
                    <p className='text-sm text-gray-500'>Sku: prod.sku</p>
                    <button onClick={() => handleAddToCart(product)} className='flex flex-row color-secondary w-40 h-14 items-center rounded px-4 space-x-4 hover:bg-[#96205d] transition-all duration-200'>
                        <img src='../static/images/cart.png' className='w-5 h-5'></img>
                        <p className='text-white font-semibold'>Add to cart</p>
                    </button>
                </div>
                <div className='w-full text-sm px-4'>
                    <div className='flex flex-row items-center justify-between border border-gray-200 p-2'>
                        <p>Product Description</p>
                        <img className='w-4 h-4' src='../static/images/plus-black.png'></img>
                    </div>
                    <div className='flex flex-row items-center justify-between border border-gray-200 p-2'>
                        <p>How to use</p>
                        <img className='w-4 h-4' src='../static/images/plus-black.png'></img>
                    </div>
                    <div className='flex flex-row items-center justify-between border border-gray-200 p-2'>
                        <p>Ingredients</p>
                        <img className='w-4 h-4' src='../static/images/plus-black.png'></img>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mx-auto w-3/4 flex flex-col space-y-4'>
              <p className='text-2xl'>Hot Deals</p>
              <Slider products={products}/>
          </div>  
    </section>
  )
}

export default ProductDetails
