import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from '../components/Slider';
import MovingImages from '../components/MovingImages';
import { ResetPage } from '../components/ResetPage';

const ProductDetails = ({onChange, setCartIsHovered, setWishlistIsHovered}) => {
    const { id } = useParams();
    let [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select your Shade / Size');
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [isHowToUseVisible, setIsHowToUseVisible] = useState(false);

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
          setCartIsHovered(true);
      };    

    const handleAddToWishlist = (product) => {
      const data = {
        product: product.id,
        is_cart: false,
        is_wishlist: true,
        quantity: quantity,
      };
    
      axios.post('http://127.0.0.1:8000/api/saveditems/create', data)
        .then((response) => {
          // Handle the response from the backend if needed
          console.log('Product added to wishlist successfully:', response.data);
    
          // Create a new wishlist item with quantity = 1
          const newWishlistItem = {
            id: response.data.id,
            product: product,
            is_cart: false,
            is_wishlist: true,
            quantity: quantity,
          };
    
          // Call the handleSavedItemsChange function with the newWishlistItem
          onChange(newWishlistItem);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error adding product to wishlist:', error);
        });
        setWishlistIsHovered(true);
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
    
      const dropdownOptions = ['Shade 1', 'Shade 2', 'Shade 3'];
    
      const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
      };
    
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

      const handleDescriptionClick = () => {
        setIsDescriptionVisible(!isDescriptionVisible);
      }

      const handleHowToUseClick = () => {
        setIsHowToUseVisible(!isHowToUseVisible);
      }
      
  return (
    <section className='w-full relative flex flex-col tracking-wide mt-16 space-y-20'>
      <ResetPage />
      <div className='mx-auto w-full xl:w-3/4 flex flex-col xl:flex-row tracking-wide p-4'>
        <div className='w-full xl:w-1/2 flex flex-col'>
            <div className='h-[60vh]'>
                <img src={product.image_url} className='mx-auto w-4/5 h-4/5'></img>
                <div className='h-1/5'>
                    <MovingImages products={products} />
                </div>
            </div>
        </div>
        <div className='w-full lg:w-1/2 flex flex-col sapce-y-4'>
          <div className='w-full xl:w-3/4'>
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
                <div className='relative'>
                  <div
                    className='p-3 border border-[#c82f7e] cursor-pointer hover:bg-gray-100'
                    onClick={toggleDropdown}
                  >
                    {selectedOption}
                  </div>
                  {isDropdownOpen && (
                    <div className='w-full absolute top-[100%] left-0 mt-2 bg-white border border-[#c82f7e]'>
                      {dropdownOptions.map((option) => (
                        <div
                          key={option}
                          className='p-3 border-t cursor-pointer hover:bg-[#c82f7e] hover:text-white'
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                <p className='text-sm text-gray-500'>Sku: {product.sku}</p>
                <div className='flex flex-col space-y-2'>
                  <button onClick={() => handleAddToCart(product)} className='flex flex-row w-48 color-secondary h-14 items-center rounded px-4 space-x-4 hover:bg-[#96205d] transition-all duration-200'>
                      <img src='../static/images/cart.png' className='w-5 h-5'></img>
                      <p className='text-white'>Add to cart</p>
                  </button>
                  <button onClick={() => handleAddToWishlist(product)} className='flex flex-row w-48 color-secondary h-14 items-center rounded px-4 space-x-4 hover:bg-[#96205d] transition-all duration-200'>
                      <img src='../static/images/heart.png' className='w-5 h-5'></img>
                      <p className='text-white'>Add to wishlist</p>
                  </button>
                </div>
            </div>
            <div className='w-full text-sm px-4'>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center justify-between border border-gray-200 p-2'>
                        <p>Product Description</p>
                        <img onClick={handleDescriptionClick} className='cursor-pointer w-4 h-4' src='../static/images/plus-black.png'></img>
                    </div>
                    {isDescriptionVisible && (
                    <div className='flex flex-row items-center justify-between border border-gray-200 p-2 text-gray-600 text-xs'>
                      <p className='h-4'>No description</p>
                    </div>
                    )}
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center justify-between border border-gray-200 p-2'>
                        <p>How to use</p>
                        <img onClick={handleHowToUseClick} className='cursor-pointer w-4 h-4' src='../static/images/plus-black.png'></img>
                    </div>
                    {isHowToUseVisible && (
                    <div className='flex flex-row items-center justify-between border border-gray-200 p-2 text-gray-600 text-xs'>
                      <p className='h-4'></p>
                    </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto w-3/4 flex flex-col space-y-4'>
          <p className='lg:text-2xl'>Hot Deals</p>
          <Slider products={products}/>
      </div>  
    </section>
  )
}

export default ProductDetails
