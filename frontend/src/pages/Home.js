import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Slider from '../components/Slider';

const Home = () => {
  const [products, setProducts] = useState([]);

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
    <section className='w-full relative tracking-wide'>
        <div className='mx-auto w-5/6 flex flex-col space-y-6'>
            <img src='../static/images/maybelline-full.jpg' className='w-full'></img>
            <div className='w-3/4 mx-auto grid grid-cols-4 gap-y-4 tracking-widest'>
                <Link to={`/category/Skin%20Care`} className='w-full flex flex-col space-y-2 items-center justify-center p-3 hover:scale-105 transition-all duration-200 cursor-pointer'>
                    <img src='../static/images/face.jpg' className='w-40 rounded-full bg-gray-200'></img>
                    <p className='text-xl font-semibold'>Face</p>
                </Link>
                <Link to={`/category/makeup`} className='w-full flex flex-col space-y-2 items-center justify-center p-3 hover:scale-105 transition-all duration-200 cursor-pointer'>
                    <img src='../static/images/eyes.jpg' className='w-40 rounded-full bg-gray-200'></img>
                    <p className='text-xl font-semibold'>Eyes</p>
                </Link>
                <Link to={`/category/Hair%20Care`} className='w-full flex flex-col space-y-2 items-center justify-center p-3 hover:scale-105 transition-all duration-200 cursor-pointer'>
                    <img src='../static/images/hair.jpg' className='w-40 rounded-full bg-gray-200'></img>
                    <p className='text-xl font-semibold'>Hair</p>
                </Link>
                <Link to={`/category/fragrance`} className='w-full flex flex-col space-y-2 items-center justify-center p-3 hover:scale-105 transition-all duration-200 cursor-pointer'>
                    <img src='../static/images/skin.jpg' className='w-40 rounded-full bg-gray-200'></img>
                    <p className='text-xl font-semibold'>Skin</p>
                </Link>
            </div>
            <img src='../static/images/wet-n-wild-full.jpg' className='w-full'></img>
            <div className='w-full grid grid-cols-2 gap-6'>
                <img src='../static/images/kerastase.jpg' className='w-full'></img>
                <img src='../static/images/nyx-half.jpg' className='w-full h-full'></img>
            </div>  
            <img src='../static/images/fragrance.jpg' className='w-full'></img>
            <div className='flex flex-col space-y-40 pt-12'>
                <div className='mx-auto w-3/5 flex flex-col space-y-12'>
                    <p className='mx-auto text-3xl'>Top Brands</p>
                    <div className='mx-auto w-full grid grid-cols-3 gap-6 justify-items-center'>
                        <Link to={`/brands/NYX%20Professional%20Makeup`} className='h-44 w-64 flex flex-col pt-5 border border-gray-300 justify-between rounded-md'>
                            <div className='w-full h-3/4 flex justify-center items-center'>
                              <img className='mx-auto w-36' src='../static/images/nyx-logo.png'></img>
                            </div>
                            <div className='flex-grow mx-auto w-full h-1/4 color-secondary flex justify-center items-center hover:h-1/2 transition-all duration-200'>
                              <p className='text-white'>15% Off</p>
                            </div>
                        </Link>
                        <Link to={`/brands/Wet%20n%20Wild%20Beauty`} className='h-44 w-64 flex flex-col pt-5 border border-gray-300 justify-between rounded-md'>
                            <div className='w-full h-3/4 flex justify-center items-center'>
                              <img className='mx-auto w-36' src='../static/images/wet-n-wild-logo.png'></img>
                            </div>
                            <div className='mx-auto w-full h-1/4 color-secondary flex justify-center items-center hover:h-1/2 transition-all duration-200'>
                              <p className='text-white'>50% Off</p>
                            </div>
                        </Link>
                        <Link to={`/brands/Maybelline%20New%20York`} className='h-44 w-64 flex flex-col pt-5 border border-gray-300 justify-between rounded-md'>
                            <div className='w-full h-3/4 flex justify-center items-center'>
                              <img className='mx-auto w-36' src='../static/images/maybelline-logo.png'></img>
                            </div>
                            <div className='mx-auto w-full h-1/4 color-secondary flex justify-center items-center hover:h-1/2 transition-all duration-200'>
                              <p className='text-white'>20% Off</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='w-full flex flex-col space-y-12'>
                    <p className='mx-auto text-3xl'>Best Sellers</p>
                    <Slider products={products}/>
                </div>
                <div className='w-full flex flex-col space-y-12'>
                    <p className='mx-auto text-3xl'>New Arrivals</p>
                    <Slider products={products}/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home
