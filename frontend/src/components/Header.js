import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';

const Header = ({savedItems, onChange, cartIsHovered, wishlistIsHovered, setCartIsHovered, setWishlistIsHovered}) => {
    const [makeupOpen, setMakeupOpen] = useState(false);
    const [skinCareOpen, setSkinCareOpen] = useState(false);
    const [hairCareOpen, setHairCareOpen] = useState(false);
    const [fragranceOpen, setFragranceOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);


    const cartRef = useRef(null);
    const wishlistRef = useRef(null);
    
    let cartItems = savedItems.filter(item => item.is_cart === true);
    let wishlistItems = savedItems.filter(item => item.is_wishlist === true);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (cartRef.current && !cartRef.current.contains(event.target)) { 
            setCartIsHovered(false);
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
            setWishlistIsHovered(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/api/saveditems/${id}/delete`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            console.log('Item deleted successfully.');
            return response;
          })
          .then(() => {
            const updatedSavedItems = savedItems.filter(item => item.id !== id);
            onChange(updatedSavedItems);
          })
          .catch(error => console.error('Error deleting item:', error));
      };      
    
          
    const handleMenuToggle = () => {
        closeAllMenus();
        setShowMenu(!showMenu);
    };
    
    const handleMenuClose = () => {
        setShowMenu(false);
    };

    const handleMakeupClick = () => {
        setMakeupOpen(true);
        setSkinCareOpen(false);
        setHairCareOpen(false);
        setFragranceOpen(false);
        handleMenuClose();
    }

    const handleSkinCareClick = () => {
        setMakeupOpen(false);
        setSkinCareOpen(true);
        setHairCareOpen(false);
        setFragranceOpen(false);
        handleMenuClose();
    }

    const handleHairCareClick = () => {
        setMakeupOpen(false);
        setSkinCareOpen(false);
        setHairCareOpen(true);
        setFragranceOpen(false);
        handleMenuClose();
    }

    const handleFragranceClick = () => {
        setMakeupOpen(false);
        setSkinCareOpen(false);
        setHairCareOpen(false);
        setFragranceOpen(true);
        handleMenuClose();
    }

    const closeAllMenus = () => {
        setMakeupOpen(false);
        setSkinCareOpen(false);
        setHairCareOpen(false);
        setFragranceOpen(false);
    }

    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
      };
      
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {

          window.location.href = `#/product-search/${query}`;
        }
      };
      

  return (
    <section className='w-full relative top-0'>
        <div className='mx-auto w-full px-8 xl:w-5/6 xl:px:0 flex flex-row justify-between py-2 tracking-wide'>
            <div className='w-full lg:w-3/5 flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 justify-between items-center'>
                <Link className='w-44 h-14 flex justify-center items-center' to={'/'}>
                    <div className='flex space-x-2 items-center justify-center'>
                        <img className='w-10' src='../static/images/logo.png'></img>
                        <p className='font-semibold tracking-wider'>Cosmetics</p>
                    </div>
                </Link>
                <div className='flex flex-row items-center w-full lg:w-3/4'>
                    <input value={query} onChange={handleInputChange} onKeyDown={handleKeyDown} className='h-6 lg:h-14 p-4 w-full border-2 border-red-300 text-gray-500 rounded tracking-wide text-sm lg:text-base' placeholder='Search for items...'></input>
                    <img src='../static/images/search.png' className='w-3 h-3 lg:w-5 lg:h-5 -translate-x-10 lg:-translate-x-20'></img>
                </div>
            </div>
            <div className='hidden lg:flex flex-row items-center space-x-3'>
                <img src='../static/images/phone.png' className='w-10 h-10'></img>
                <div className='flex flex-col'>
                    <p className='text-xl text-red-600 tracking-normal'>+76 583 1110327</p>
                    <p className='text-sm text-gray-500 tracking-wide'>Support Hours 09:00 - 20:00</p>
                </div>
            </div>
        </div>
        <div className='w-full lg:border lg:border-b-0 lg:border-gray-200'>
            <div className='mx-auto w-full px-2 lg:px-8 py-0 lg:py-3 xl:w-5/6 xl:px:0 flex flex-row justify-center lg:justify-between items-center'>
                <div className='hidden lg:flex flex-col'>
                    <div className='flex flex-row space-x-10 items-center'>
                        <div className='flex flex-col'>
                            <div onClick={handleMenuToggle} className='h-12 w-44 flex flex-row color-secondary rounded items-center justify-evenly p-2 hover:bg-[#96205d] transition-all duration-200 cursor-pointer'>
                                <img src='../static/images/menu.png' className='w-5 h-5'></img>
                                <p className='text-white'>Top Brands</p>
                                {showMenu && (<img src='../static/images/down-arrow-white.png' className='w-5 h-5 rotate-180'></img>)}
                                {!showMenu && (<img src='../static/images/down-arrow-white.png' className='w-5 h-5'></img>)}
                            </div>
                            {showMenu && (<div className='absolute top-36 bg-white w-1/5 border border-gray-300 p-4 z-50 rounded-lg'>
                                <div className='w-full grid grid-cols-2 gap-4'>
                                    <Link to={`/brands/NYX%20Professional%20Makeup`} onClick={()=> handleMenuClose()} className='p-2 py-4 flex flex-row border border-gray-200 items-center justify-center rounded hover:text-[#c82f7e] hover:border-[#c82f7e] cursor-pointer transition-all duration-200'>
                                        <p className='text-center text-sm'>NYX Professional Makeup</p>
                                    </Link>
                                    <Link to={`/brands/Egyptian%20Magic`} onClick={()=> handleMenuClose()} className='p-2 py-4 flex flex-row border border-gray-200 items-center justify-center rounded hover:text-[#c82f7e] hover:border-[#c82f7e] cursor-pointer transition-all duration-200'>
                                        <p className='text-center text-sm'>Egyptian Magic</p>
                                    </Link>
                                    <Link to={`/brands/Maybelline%20New%20York`} onClick={()=> handleMenuClose()} className='p-2 py-4 flex flex-row border border-gray-200 items-center justify-center rounded hover:text-[#c82f7e] hover:border-[#c82f7e] cursor-pointer transition-all duration-200'>
                                        <p className='text-center text-sm'>Maybelline New York</p>
                                    </Link>
                                    <Link to={`/brands/Kerastase`} onClick={()=> handleMenuClose()} className='p-2 py-4 flex flex-row border border-gray-200 items-center justify-center rounded hover:text-[#c82f7e] hover:border-[#c82f7e] cursor-pointer transition-all duration-200'>
                                        <p className='text-center text-sm'>Kerastase</p>
                                    </Link>
                                    <Link to={`/brands/Wet%20n%20Wild%20Beauty`} onClick={()=> handleMenuClose()} className='p-2 py-4 flex flex-row border border-gray-200 items-center justify-center rounded hover:text-[#c82f7e] hover:border-[#c82f7e] cursor-pointer transition-all duration-200'>
                                        <p className='text-center text-sm'>Wet n Wild Beauty</p>
                                    </Link>
                                    <Link to={`/brands/SugarBear%20Hair`} onClick={()=> handleMenuClose()} className='p-2 py-4 flex flex-row border border-gray-200 items-center justify-center rounded hover:text-[#c82f7e] hover:border-[#c82f7e] cursor-pointer transition-all duration-200'>
                                        <p className='text-center text-sm'>SugarBear Hair</p>
                                    </Link>
                                </div>
                            </div>)}
                        </div>
                        <div className='flex flex-col'>
                        <ul className='flex flex-row space-x-6'>
                            <Link to={`/category/makeup`} onClick={() => setMakeupOpen(false)}
                                className='flex flex-row items-center space-x-2 cursor-pointer'
                                onMouseEnter={() => handleMakeupClick()}
                            >
                                <p className={makeupOpen ? 'text-[#c82f7e]' : 'hover:text-[#c82f7e]'}>
                                Makeup
                                </p>
                                <img src='../static/images/down-arrow.png' className='w-2 h-2'></img>
                            </Link>
                            <Link to={`/category/Skin%20Care`} onClick={() => setSkinCareOpen(false)}
                                className='flex flex-row items-center space-x-2 cursor-pointer'
                                onMouseEnter={() => handleSkinCareClick()}
                            >
                                <p className={skinCareOpen ? 'text-[#c82f7e]' : 'hover:text-[#c82f7e]'}>
                                Skin Care
                                </p>
                                <img src='../static/images/down-arrow.png' className='w-2 h-2'></img>
                            </Link>
                            <Link to={`/category/Hair%20Care`} onClick={() => setHairCareOpen(false)}
                                className='flex flex-row items-center space-x-2 cursor-pointer'
                                onMouseEnter={() => handleHairCareClick()}
                            >
                                <p className={hairCareOpen ? 'text-[#c82f7e]' : 'hover:text-[#c82f7e]'}>
                                Hair Care
                                </p>
                                <img src='../static/images/down-arrow.png' className='w-2 h-2'></img>
                            </Link>
                            <Link to={`/category/fragrance`} onClick={() => setFragranceOpen(false)}
                                className='flex flex-row items-center space-x-2 cursor-pointer'
                                onMouseEnter={() => handleFragranceClick()}
                            >
                                <p className={fragranceOpen ? 'text-[#c82f7e]' : 'hover:text-[#c82f7e]'}>
                                Fragrance
                                </p>
                                <img src='../static/images/down-arrow.png' className='w-2 h-2'></img>
                            </Link>
                        </ul>
                        </div>
                    </div>
                    {makeupOpen && (<div onMouseEnter={() => setMakeupOpen(true)}
                                onMouseLeave={() => setMakeupOpen(false)} className='makeup absolute top-36 bg-white w-5/6 border border-gray-300 h-[45vh] z-50 rounded'>
                        <div className='flex py-2 pl-8 items-center space-x-2'>
                            <img className='w-6 h-6' src='../static/images/warning.png'></img>
                            <p className='text-[#c82f7e]'>Sample Options, unclickable.</p>
                        </div>
                        <div className='w-full grid grid-cols-7 p-8'>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Eye</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Eyelashes</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Eyeliner</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Mascara</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Eyeshadow</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Eyebrows</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Eye Pencil</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Eye Set</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Lips</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Lipsticks</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Lip Plumper</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Lip Balm</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Lip Pencils</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Lip Stain</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Lip Gloss</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Lip Sets</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Face</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Blushes</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Primer</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Foundations</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Setting Spray</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Highlighters</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Setting Powder</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Concealer</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Setting Powder</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Nails</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Nail Polish Remover</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Nail Polish</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Nail Glue</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Nail Tools</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Nails</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Accessories</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Makeup Brushes</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Beauty Tools</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Candle Accessories</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Face Brush</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Brush Sets</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Sponges</li>
                                </ul>
                            </div>
                        </div>
                    </div>)}
                    {skinCareOpen && (<div onMouseEnter={() => setSkinCareOpen(true)}
                                onMouseLeave={() => setSkinCareOpen(false)} className='skinCare absolute top-36 bg-white w-5/6 border border-gray-300 h-[45vh] z-50 rounded'>
                        <div className='flex py-2 pl-8 items-center space-x-2'>
                            <img className='w-6 h-6' src='../static/images/warning.png'></img>
                            <p className='text-[#c82f7e]'>Sample Options, unclickable.</p>
                        </div>
                        <div className='w-full grid grid-cols-7 p-8'>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Face Masks</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Sheet Masks</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Peel Off Masks</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Eye Masks</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Moisturizer</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hand Cream</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Lotion</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Face Cream</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Night Cream</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Mist & Essence</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Skin Treatment</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Eye Cream</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Supplement</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Face Serum</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Sunscreen</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Essential Oils</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Cleaner</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Face Wipes</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Makeup Remover</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Exfoliator</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Scrub</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Toners</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Bath & Body</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Soap</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hand Soap</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Remover</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Body Lotion & Oils</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Face Wash</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Body Wax</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Baby Care</li>
                                </ul>
                            </div>
                        </div>
                    </div>)}
                    {hairCareOpen && (<div onMouseEnter={() => setHairCareOpen(true)}
                                onMouseLeave={() => setHairCareOpen(false)} className='hairCare absolute top-36 bg-white w-5/6 border border-gray-300 h-[45vh] z-50 rounded'>
                        <div className='flex py-2 pl-8 items-center space-x-2'>
                            <img className='w-6 h-6' src='../static/images/warning.png'></img>
                            <p className='text-[#c82f7e]'>Sample Options, unclickable.</p>
                        </div>
                        <div className='w-full grid grid-cols-7 p-8'>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Professional Hair</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Kerastase</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Paul Mitchell</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Shampoo & Conditioner</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Shampoo</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Conitioner</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Hair Treatment</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Oil</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Supplments</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Serums</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Fiber</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Cream</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Beard Oil</li>
                                </ul>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Styling</p>
                                <ul className='flex flex-col space-y-2 text-gray-500 p-1'>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Color</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Gel</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Spray</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Styling Cream</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Dry Shampoo</li>
                                    <li className='cursor-pointer hover:text-[#c82f7e]'>Hair Mist</li>
                                </ul>
                            </div>
                        </div>
                    </div>)}
                    {fragranceOpen && (<div onMouseEnter={() => setFragranceOpen(true)}
                                onMouseLeave={() => setFragranceOpen(false)} className='fragrance absolute top-36 bg-white w-5/6 border border-gray-300 h-[45vh] z-50 rounded'>
                        <div className='flex py-2 pl-8 items-center space-x-2'>
                            <img className='w-6 h-6' src='../static/images/warning.png'></img>
                            <p className='text-[#c82f7e]'>Sample Options, unclickable.</p>
                        </div>
                        <div className='w-full grid grid-cols-7 p-8'>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Miniatures</p>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Baby Cologne</p>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Men</p>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-[#c82f7e] text-lg cursor-pointer'>Women</p>
                            </div>
                        </div>
                    </div>)}
                </div>
                <div className='flex flex-row text-sm lg:text-base'>
                    <ul className='w-full flex flex-row space-x-3 lg:space-x-6 items-center justify-center'>
                        <li className='max-h-[50vh] lg:max-h-[75vh]'>
                        <Link onClick={() => {setWishlistIsHovered(true); setCartIsHovered(false);}}
                            className="block p-2">
                            <div className='flex flex-col lg:flex-row items-center justify-center space-x-1'>
                                <img src='../static/images/love.png' className='w-4 h-4 lg:w-7 lg:h-7'></img>
                                <p className='text-gray-500'>Wishlist</p>
                            </div>
                            {wishlistIsHovered && (
                            <div onMouseEnter={() => setWishlistIsHovered(true)}
                            className="popover absolute right-0 lg:right-40 w-full lg:w-96 bg-white rounded flex-col lg:my-3 drop-shadow-lg z-50" ref={wishlistRef}>
                                <div className="flex flex-col">
                                <p className="mx-auto m-4 lg:text-lg">Your Wishlist</p>
                                {wishlistItems.length > 0 && (
                                    <div
                                    className={`cart-items-container ${
                                        wishlistItems.length > 3 ? 'overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#c82f7e]' : ''
                                    }`}
                                    style={{ maxHeight: 'calc(75vh - 120px)' }}>
                                    {wishlistItems.map((item) => (
                                        <>
                                        <div className="w-3/5 mx-auto border border-gray-100 mb-2"></div>
                                        <div className="mx-auto w-4/5 flex flex-row my-3 justify-between text-xs lg:text-sm space-x-1">
                                            <img
                                                className="w-16 h-16 lg:w-20 lg:h-20"
                                                src={item.product.image_url}
                                                alt={item.name}
                                            />
                                            <div className="flex flex-grow flex-row text-left justify-between items-center p-3">
                                                <div className="w-full flex flex-col space-y-1">
                                                    <p className="w-full">
                                                    {item.product.name}
                                                    </p>
                                                    <p className="mb-2">$ {item.product.price}</p>
                                                </div>
                                                <div className=''>
                                                    <img
                                                    src="./static/images/delete.png"
                                                    className="w-6"
                                                    onClick={() => handleDelete(item.id)}
                                                    alt="delete"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                    ))}
                                    </div>
                                )}
                                {!wishlistItems.length > 0 && (<div className='w-full flex flex-row justify-center space-x-2 items-center p-3'>
                                        <p className='tracking-wider'>No Items</p>
                                    </div>)}
                                </div>
                            </div>
                            )}
                        </Link>
                        </li>
                        <li className='max-h-[50vh] lg:max-h-[75vh]'>
                        <Link onClick={() => {setCartIsHovered(true); setWishlistIsHovered(false);}}
                            className="block p-2">
                            <div className='flex flex-col lg:flex-row items-center justify-center space-x-1'>
                                <img src='../static/images/bag.png' className='w-4 h-4 lg:w-7 lg:h-7'></img>
                                <p className='text-gray-500'>Cart</p>
                            </div>
                            {cartIsHovered && (
                            <div onMouseEnter={() => setCartIsHovered(true)}
                            className="popover absolute right-0 lg:right-40 w-full lg:w-96 bg-white rounded flex-col lg:my-3 drop-shadow-lg z-50" ref={cartRef}>
                                <div className="flex flex-col">
                                    <p className="mx-auto m-4 lg:text-lg">Your Cart</p>
                                    {cartItems.length > 0 && (
                                    <div
                                    className={`cart-items-container ${
                                        cartItems.length > 3 ? 'overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#c82f7e]' : ''
                                    }`}
                                    style={{ maxHeight: 'calc(75vh - 120px)' }}>
                                    {cartItems.map((item) => (
                                        <>
                                        <div className="w-3/5 mx-auto border border-gray-100 mb-2"></div>
                                        <div className="mx-auto w-4/5 flex flex-row my-3 justify-between text-xs lg:text-sm space-x-1">
                                            <img
                                                className="w-16 h-16 lg:w-20 lg:h-20"
                                                src={item.product.image_url}
                                                alt={item.name}
                                            />
                                            <div className="flex flex-grow flex-row text-left justify-between items-center p-3">
                                                <div className="w-full flex flex-col space-y-1">
                                                    <p className="w-full">
                                                    {item.product.name} x {item.quantity}
                                                    </p>
                                                    <p className="mb-2">$ {item.product.price}</p>
                                                </div>
                                                <div className=''>
                                                    <img src="./static/images/delete.png" className="w-6" onClick={() => handleDelete(item.id)} alt="delete"/>
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                    ))}
                                    </div>
                                    )}
                                    {cartItems.length > 0 ? (<Link to={'/checkout'} className='w-full flex flex-row color-secondary justify-center space-x-2 items-center p-3 hover:bg-[#96205d] transition-all duration-200 cursor-pointer'>
                                        <p className='text-white text-sm font-semibold tracking-wider'>Checkout</p>
                                    </Link>) : (<div className='w-full flex flex-row justify-center space-x-2 items-center p-3'>
                                        <p className='tracking-wider'>No Items</p>
                                    </div>)}
                                </div>
                            </div>
                            )}
                        </Link>
                        </li>
                        <li className=''>
                        <Link to={'/login'} className='block p-2'>
                            <div className='flex flex-col lg:flex-row justify-center items-center space-x-1 cursor-pointer'>
                                <img src='../static/images/user.png' className='w-4 h-4 lg:w-7 lg:h-7'></img>
                                <p className='text-gray-500'>Account</p>
                            </div>
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Header