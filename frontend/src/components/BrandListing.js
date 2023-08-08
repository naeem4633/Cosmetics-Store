import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Listing from './Listing';

const BrandListing = ({onChange, setCartIsHovered, setWishlistIsHovered }) => {
    const { brandName } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
      // Function to fetch the products based on the brand name
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/brand-products/${brandName}`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      // Call the fetchProducts function when the component mounts
      fetchProducts();
    }, [brandName]);

  return (
    <Listing products={products} onChange={onChange} setCartIsHovered={setCartIsHovered} setWishlistIsHovered={setWishlistIsHovered}/>
  )
}

export default BrandListing
