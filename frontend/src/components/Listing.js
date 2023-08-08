import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Listing = ({products, onChange, setWishlistIsHovered, setCartIsHovered}) => {
    const [user, setUser] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [sortOption, setSortOption] = useState('None');
  
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
        <div className='mx-auto w-full px-8 xl:w-5/6 xl:px-0 flex flex-col space-y-6'>
            <img src='../static/images/listing-cover.jpg' className='w-full'></img>
            <div className='flex flex-row'>
                <div className='w-1/5 flex flex-col space-y-8'>
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
                            <Link to={`/brands/Kerastane`} className='rounded-md p-3 border border-gray-200 hover:bg-gray-200'>Kerastane</Link>
                            <Link to={`/brands/Wet%20n%20Wild%20Beauty`} className='rounded-md p-3 border border-gray-200 hover:bg-gray-200'>Wet n Wild Beauty</Link>
                            <Link to={`/brands/SugarBear%20Hair`}  className='rounded-md p-3 border border-gray-200 hover:bg-gray-200'>SugarBear Hair</Link>
                        </ul>
                    </div>
                </div>
                <div className='w-4/5 flex flex-col p-4 space-y-8'>
                    <div aria-haspopup="true" aria-expanded={dropdownOpen} onClick={toggleDropdown} className='ml-5 right-0 w-40 border border-gray-300 p-2 rounded-md flex flex-row space-x-2 items-center justify-between cursor-pointer'>
                        <img className='w-4 h-4' src='../static/images/sort.png'></img>
                        <p className="mx-2">Sort By</p>
                        {!dropdownOpen && (<img src="../static/images/down-arrow.png" alt="Down arrow icon" className="w-3 h-3" />)}
                        {dropdownOpen && (<img src="../static/images/down-arrow.png" alt="Down arrow icon" className="w-3 h-3 rotate-180" />)}
                        {dropdownOpen && (
                        <ul className="w-40 bg-white absolute rounded border border-gray-300 translate-y-3/4 -translate-x-4" aria-labelledby="filterDropdown">
                            <li>
                                <button className="w-full mx-auto p-3 hover:bg-gray-200" onClick={() => handleSort('low_to_high')}>
                                Price: Low to high
                                </button>
                            </li>
                            <li>
                                <button className="w-full mx-auto p-3 hover:bg-gray-200" onClick={() => handleSort('high_to_low')}>
                                Price: High to low
                                </button>
                            </li>
                        </ul>
                        )}
                    </div>
                    <div className='p-2 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-stretch gap-y-6'>
                        {sortedProducts.map((product) => (
                        <div key={product.id} className='flex flex-col p-3 space-y-2 hover:scale-105 transition-all duration-200'>
                            <Link to={`/product-details/${product.id}`} className='space-y-2'>
                              <img src={product.image_url} className='mx-auto w-4/5'></img>
                              <p className='h-10 text-sm'>{product.brand} {product.name}</p>
                            </Link>
                            <p className='text-sm font-semibold'>${product.price}</p>
                            <div className='flex w-full justify-between space-x-1'>
                                <div onClick={() => handleAddToCart(product)} className='w-4/5 flex flex-row color-secondary justify-center space-x-2 items-center p-3 hover:bg-[#96205d] transition-all duration-200 cursor-pointer'>
                                    <img className='w-5 h-5' src='../static/images/cart.png'></img>
                                    <p className='text-white text-sm font-semibold'>Add to Cart</p>
                                </div>
                                <div onClick={() => handleAddToWishlist(product)} className='flex-grow border border-gray-300 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition-all duration-200 rounded'>
                                    <img className='w-8 h-8' src='../static/images/love.png'></img>
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