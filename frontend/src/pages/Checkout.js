import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({savedItems, onChange}) => {
    const [orderPlacedVisible, setOrderPlacedVisible] = useState(false);
    let cartItems = savedItems.filter(item => item.is_cart === true);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      address: '',
      cardNumber: '',
      cvv: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
    
    const handleDelete = (id) => {
      fetch(`http://127.0.0.1:8000/api/saveditems/${id}/delete`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            // If the deletion was successful, update the savedItems state locally
            const updatedSavedItems = savedItems.filter(item => item.id !== id);
            onChange(updatedSavedItems);
          } else {
            console.error('Failed to delete the item.');
          }
        })
        .catch(error => console.error('Error occurred while deleting:', error));
    };

      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Create the data object to be sent in the POST request
        const data = {
          saved_items: cartItems,
          shipping_address: formData.address,
        };
    
        axios.post('http://127.0.0.1:8000/api/order/create', data)
          .then((response) => {
            // Handle the successful response from the backend if needed
            console.log('Order created successfully:', response.data);
            // Redirect or show a success message to the user
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error creating order:', error);
            // Show an error message to the user
          });
          setOrderPlacedVisible(true);
      };
  return (
    <section className='w-full relative flex flex-col tracking-wide mt-4 xl:mt-16'>
        <div className='mx-auto w-full xl:w-4/5 flex flex-col lg:flex-row tracking-wide p-2 justify-between'>
            <div className='w-full xl:w-1/2 flex flex-col space-y-2 p-4'>
                <p className='text-2xl text-[#c82f7e]'>Checkout</p>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <p className='font-semibold'>Shipping Details</p>
                    <div className='w-full flex flex-row space-x-4'>
                        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='First Name' className='w-1/2 p-3 focus:outline-[#c82f7e] rounded border border-gray-300'/>
                        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Last Name' className='w-1/2 p-3 focus:outline-[#c82f7e] rounded border border-gray-300'/>
                    </div>
                    <input type='text' name='address' value={formData.address} onChange={handleChange} placeholder='Address' className='w-full p-3 focus:outline-[#c82f7e] rounded border border-gray-300'/>
                    <p className='font-semibold'>Payment Details</p>
                    <div className='mx-auto w-full xl:w-1/2 flex py-2 items-center space-x-2'>
                        <img className='w-6 h-6' src='../static/images/warning.png'></img>
                        <p className='text-[#c82f7e]'>Sample inputs, not to be filled</p>
                    </div>
                    <img src='../static/images/card.jpg' className='mx-auto w-1/2 rounded-3xl' alt='Credit Card'></img>
                    <div className='w-full xl:w-3/4 mx-auto flex flex-row justify-center space-x-4'>
                        <input className='w-3/4 mx-auto p-3 focus:outline-[#c82f7e] rounded border border-gray-300' type='text' name='cardNumber' value={formData.cardNumber} onChange={handleChange} placeholder='Card Number' />
                        <input type='text' name='cvv' value={formData.cvv} onChange={handleChange} placeholder='CVV' className='w-1/4 mx-auto p-3 rounded border border-gray-300 focus:outline-[#c82f7e]'/>
                    </div>
                    <input className='w-3/4 xl:w-1/2 mx-auto p-3 focus:outline-[#c82f7e] rounded border border-gray-300' type='text' name='cardholderName' value={formData.cardholderName} onChange={handleChange} placeholder='Cardholder Name'/>
                    <div className='mx-auto w-full flex flex-row justify-center items-center space-x-4'>
                        <input type='text' name='expiryMonth' value={formData.expiryMonth} onChange={handleChange} placeholder='MM' className='w-1/4 p-3 focus:outline-[#c82f7e] rounded border border-gray-300'/>
                        <input type='text' name='expiryYear' value={formData.expiryYear} onChange={handleChange} placeholder='YY' className='w-1/4 p-3 focus:outline-[#c82f7e] rounded border border-gray-300'/>
                    </div>
                    <button type='submit' className='w-full bg-[#c82f7e] text-white font-semibold p-3 rounded border border-gray-300 hover:bg-[#96205d] transition-all duration-200 tracking-wider'>
                        Place Order
                    </button>
                </form>
                {orderPlacedVisible && (
                <div class="mx-auto w-full xl:w-1/2 flex items-center p-4 mt-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                  <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">Order Placed!</span>
                  </div>
                </div>
                )}
            </div>
            <div className='w-full xl:w-1/2 flex flex-row items-center justify-center'>
                <div className='mx-auto w-full xl:w-3/4 flex flex-col space-y-2 border-2 border-[#c82f7e] drop-shadow-sm'>
                    <p className='text-2xl text-[#c82f7e] px-10 py-5'>Your Cart</p>
                    <div className='h-[50vh] flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-[#c82f7e] lg:px-10'>
                    {cartItems.map((item) => (
                    <>
                    <div className="mx-auto w-full flex flex-row mt-3 mb-5 justify-between text-sm space-x-1">
                        <img className="w-20 h-20"
                            src={item.product.image_url}/>
                        <div className="flex flex-grow flex-row text-left justify-between items-center px-3 pt-3">
                            <div className="w-full flex flex-col space-y-1">
                                <p className="w-full">
                                {item.product.name} x {item.quantity}
                                </p>
                                <p className="mb-2">$ {item.product.price}</p>
                            </div>
                            <div className='cursor-pointer'>
                                <img src="./static/images/bin.png" className="w-5" onClick={() => handleDelete(item.id)} alt="delete" />
                            </div>
                        </div>
                    </div>
                    </>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Checkout
