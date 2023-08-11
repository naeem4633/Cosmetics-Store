import './App.css';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Listing from './components/Listing';
import axios from 'axios';
import BrandListing from './components/BrandListing';
import CategoryListing from './components/CategoryListing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import SearchResults from './pages/SearchResults';

function App() {
  const [savedItems, setSavedItems] = useState([]);
  const [cartIsHovered, setCartIsHovered] = useState(false);
  const [wishlistIsHovered, setWishlistIsHovered] = useState(false);

  useEffect(() => {
    // Function to fetch savedItems from the backend
    const fetchSavedItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/saveditems');
        setSavedItems(response.data);
      } catch (error) {
        console.error('Error fetching savedItems:', error);
      }
    };

    // Call the fetchSavedItems function when the component mounts
    fetchSavedItems();
  }, []);
  
  const handleSavedItemsArrayChange = (updatedItems) => {
    setSavedItems(updatedItems);
  };

  const handleSavedItemsChange = (newItem) => {
    // Check if the product already exists in the savedItems array
    const existingItemIndex = savedItems.findIndex(
      (item) => item.product.id === newItem.product.id && item.is_cart === newItem.is_cart && item.is_wishlist === newItem.is_wishlist
    );
  
    if (existingItemIndex !== -1) {
      // If the product already exists, update the quantity
      const updatedSavedItems = [...savedItems];
      updatedSavedItems[existingItemIndex].quantity += newItem.quantity;
      setSavedItems(updatedSavedItems);
    } else {
      // If the product doesn't exist, add the new item to the array
      setSavedItems([...savedItems, newItem]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header savedItems={savedItems} onChange={handleSavedItemsArrayChange} cartIsHovered={cartIsHovered} wishlistIsHovered={wishlistIsHovered} setCartIsHovered={setCartIsHovered} setWishlistIsHovered={setWishlistIsHovered}/>
        <div className="App-body">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product-details/:id' element={<ProductDetails onChange={handleSavedItemsChange} setCartIsHovered={setCartIsHovered} setWishlistIsHovered={setWishlistIsHovered}/>}/>
            <Route path='/listing' element={<Listing onChange={handleSavedItemsChange} setCartIsHovered={setCartIsHovered} setWishlistIsHovered={setWishlistIsHovered}/>}/>
            <Route path='/brands/:brandName' element={<BrandListing onChange={handleSavedItemsChange} setCartIsHovered={setCartIsHovered} setWishlistIsHovered={setWishlistIsHovered}/>}/>
            <Route path='/category/:categoryName' element={<CategoryListing onChange={handleSavedItemsChange} setCartIsHovered={setCartIsHovered} setWishlistIsHovered={setWishlistIsHovered}/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/checkout' element={<Checkout savedItems={savedItems} onChange={handleSavedItemsArrayChange} />} />
            <Route path='/product-search/:query' element={<SearchResults />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;