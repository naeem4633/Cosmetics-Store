import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Listing from './Listing';

const CategoryListing = ({onChange, setCartIsHovered, setWishlistIsHovered}) => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
      // Function to fetch the products based on the category name
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/category-products/${categoryName}`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      // Call the fetchProducts function when the component mounts
      fetchProducts();
    }, [categoryName]);

  return (
    <Listing products={products} onChange={onChange} setCartIsHovered={setCartIsHovered} setWishlistIsHovered={setWishlistIsHovered}/>
  )
}

export default CategoryListing
