import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { ResetPage } from '../components/ResetPage';

const Listing = ({products, onChange, setWishlistIsHovered, setCartIsHovered}) => {
    const [user, setUser] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [sortOption, setSortOption] = useState('None');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1023);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const handleMouseLeave = () => {
      setDropdownOpen(false);
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
    
    const toggleFilterDropdown = () => {
      setFilterDropdownOpen(!filterDropdownOpen);
    };
  
    const handleSort = (option) => {
      setSortOption(option);
      setDropdownOpen(false);
    };
  
    const sortProducts = (option) => {
      let sortedProducts = [...products];
    
      switch (option) {
        case 'low_to_high':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'high_to_low':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'Range 1':
          sortedProducts = sortedProducts.filter((product) => {
            return product.price >= 0 && product.price <= 50;
          });
          break;
        case 'Range 2':
          sortedProducts = sortedProducts.filter((product) => {
            return product.price >= 50 && product.price <= 100;
          });
          break;
        case 'Range 3':
          sortedProducts = sortedProducts.filter((product) => {
            return product.price >= 100 && product.price <= 150;
          });
          break;
        default:
          // Keep the original order if no sorting option is selected
          break;
      }
    
      return sortedProducts;
    };
  
    const sortedProducts = sortProducts(sortOption);

    const handleAddToCart = (product) => {
      // Create the data object to be sent in the POST request
      const data = {
        product: product.id,
        is_cart: true,
        is_wishlist: false,
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
            quantity: 1,
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
            quantity: 1,
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

  return (
    <section className='w-full relative tracking-wide'>
        <ResetPage />
        <div className='mx-auto w-full px-2 xl:w-5/6 xl:px-0 flex flex-col space-y-6'>
            <img src={isMobile ? "../static/images/listing-cover-mobile.jpg" : "../static/images/listing-cover.jpg"} className='w-full'></img>
              <div className='w-full flex flex-row'>
                <div className='w-1/5 hidden lg:flex flex-col space-y-8'>
                    <div className='w-full flex flex-col border border-gray-300 px-4 py-6 rounded-lg space-y-6'>
                        <p className='text-2xl'>Filter by Price</p>
                        <hr></hr>
                        <div onClick={toggleFilterDropdown} className='border border-gray-300 p-3 rounded-md flex flex-col items-center justify-between cursor-pointer'>
                          <div className='w-full flex flex-row justify-between items-center'>
                            <p>Select range</p>
                            <img
                              className='w-4 h-4 cursor-pointer'
                              src='../static/images/down-arrow.png'
                              alt='Dropdown Icon'
                            />
                          </div>
                          {filterDropdownOpen && (
                            <ul className='w-72 bg-white absolute rounded border border-gray-300 mt-10'>
                              <li>
                                <button
                                  className='w-full py-2 px-4 hover:bg-gray-200'
                                  onClick={() => handleSort('Range 1')}
                                >
                                  $0 to $50
                                </button>
                              </li>
                              <li>
                                <button
                                  className='w-full py-2 px-4 hover:bg-gray-200'
                                  onClick={() => handleSort('Range 2')}
                                >
                                  $50 to $100
                                </button>
                              </li>
                              <li>
                                <button
                                  className='w-full py-2 px-4 hover:bg-gray-200'
                                  onClick={() => handleSort('Range 3')}
                                >
                                  $100 to $150
                                </button>
                              </li>
                              {/* Add more price ranges here as needed */}
                            </ul>
                          )}
                        </div>
                    </div>
                    <div className='w-full flex flex-col border border-gray-300 px-4 py-6 rounded-lg space-y-6'>
                        <p className='text-2xl'>Brands</p>
                        <hr></hr>
                        <ul className='flex flex-col space-y-3'>
                            <Link to={`/brands/NYX%20Professional%20Makeup`} className='rounded-md p-3 border border-gray-200 hover:bg-gray-200'>NYX Professional Makeup</Link>
                            <Link to={`/brands/Egyptian%20Magic`} className='rounded-md p-3 border border-gray-200 hover:bg-gray-200'>Egyptian Magic</Link>
                            <Link to={`/brands/Maybelline%20New%20York`} className='rounded-md p-3 border border-gray-200 hover:bg-gray-200'>Maybelline New York</Link>
                            <Link to={`/brands/Kerastase`} className='rounded-md p-3 border border-gray-200 hover:bg-gray-200'>Kerastase</Link>
                            <Link to={`/brands/Wet%20n%20Wild%20Beauty`} className='rounded-md p-3 border border-gray-200 hover:bg-gray-200'>Wet n Wild Beauty</Link>
                            <Link to={`/brands/SugarBear%20Hair`}  className='rounded-md p-3 border border-gray-200 hover:bg-gray-200'>SugarBear Hair</Link>
                        </ul>
                    </div>
                </div>
                <div className='w-full lg:w-4/5 flex flex-col lg:p-4 space-x-2 lg:space-y-8'>
                    <div aria-haspopup="true" aria-expanded={dropdownOpen} onClick={toggleDropdown} className='ml-5 right-0 w-28 lg:w-40 border border-gray-300 p-2 rounded-md flex flex-row space-x-2 items-center justify-between cursor-pointer'>
                        <img className='w-4 h-4' src='../static/images/sort.png'></img>
                        <p className="text-sm lg:text-base mx-2">Sort By</p>
                        {!dropdownOpen && (<img src="../static/images/down-arrow.png" alt="Down arrow icon" className="w-3 h-3" />)}
                        {dropdownOpen && (<img src="../static/images/down-arrow.png" alt="Down arrow icon" className="w-3 h-3 rotate-180" />)}
                        {dropdownOpen && (
                        <ul className="w-28 lg:w-40 bg-white absolute rounded border border-gray-300 translate-y-3/4 -translate-x-4" aria-labelledby="filterDropdown">
                            <li>
                                <button className="w-full mx-auto p-3 hover:bg-gray-200 text-xs lg:text-base " onClick={() => handleSort('low_to_high')}>
                                Price: Low to high
                                </button>
                            </li>
                            <li>
                                <button className="w-full mx-auto p-3 hover:bg-gray-200 text-xs lg:text-base " onClick={() => handleSort('high_to_low')}>
                                Price: High to low
                                </button>
                            </li>
                        </ul>
                        )}
                    </div>
                    <div className='p-2 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-stretch gap-y-6'>
                        {sortedProducts.map((product) => (
                        <div key={product.id} className='flex flex-col p-1 lg:p-3 space-y-2 hover:scale-105 transition-all duration-200 text-xs lg:text-sm'>
                            <Link to={`/product-details/${product.id}`} className='space-y-2'>
                              <img src={product.image_url} className='mx-auto w-4/5'></img>
                              <p className='h-10'>{product.brand} {product.name}</p>
                            </Link>
                            <p className=' font-semibold'>${product.price}</p>
                            <div className='flex w-full justify-between space-x-1'>
                                <div onClick={() => handleAddToCart(product)} className='w-4/5 flex flex-row color-secondary justify-center lg:p-3 space-x-2 items-center hover:bg-[#96205d] transition-all duration-200 cursor-pointer'>
                                    <img className='w-5 h-5' src='../static/images/cart.png'></img>
                                    <p className='text-white font-semibold'>Add to Cart</p>
                                </div>
                                <div onClick={() => handleAddToWishlist(product)} className='flex-grow border border-gray-300 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition-all duration-200 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-6 h-6 stroke-[#c82f7e]'><path d="m12 20.703.343.667a.748.748 0 0 1-.686 0l-.003-.002-.007-.003-.025-.013a31.138 31.138 0 0 1-5.233-3.576C3.8 15.573 1 12.332 1 8.514v-.001C1 5.053 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262a31.148 31.148 0 0 1-5.233 3.576l-.025.013-.007.003-.002.001ZM6.736 4C4.657 4 2.5 5.88 2.5 8.514c0 3.107 2.324 5.96 4.861 8.12a29.655 29.655 0 0 0 4.566 3.175l.073.041.073-.04c.271-.153.661-.38 1.13-.674.94-.588 2.19-1.441 3.436-2.502 2.537-2.16 4.861-5.013 4.861-8.12C21.5 5.88 19.343 4 17.264 4c-2.106 0-3.801 1.389-4.553 3.643a.751.751 0 0 1-1.422 0C10.537 5.389 8.841 4 6.736 4Z"></path></svg>
                                </div>
                            </div>  
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Listing