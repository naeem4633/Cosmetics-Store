import React from 'react'
import { Link } from 'react-router-dom'
import { ResetPage } from '../components/ResetPage';

const ErrorPage = () => {
  return (
    <section className='flex flex-col space-y-8 items-center w-full text-black'>
        <ResetPage />
        <div className="flex flex-col items-center w-full h-[50vh]">
            <div className='w-full h-full flex flex-col justify-evenly'>
                <div className='flex flex-col heading items-center'>
                    <p className='text-red-600 text-6xl font-bold'>404</p>
                    <p className='text-xl lg:text-4xl font-semibold text-red-600'>Page Not Found</p> 
                </div>
            </div>
            <Link to={'/'} className='w-full lg:w-3/4 items-center p-8'>
                <div className='mx-auto flex flex-row items-center justify-evenly w-52 h-12 rounded text-white bg-gray-900 tracking-wider'>
                    <button className=''>Back to Home Page</button>
                </div>
            </Link>
        </div>
    </section>
  )
}

export default ErrorPage
