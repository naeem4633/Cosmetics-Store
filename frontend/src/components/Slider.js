import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from 'react-router-dom';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const Slider = ({products}) => {
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        partialVisible={false}
        // dotListClass="custom-dot-list-style"
      >
        {products.map((product, index) => (
          <div key={index} className="flex-shrink-0 h-72 w-full p-2">
            <div className='w-full h-full flex flex-col space-y-3 border border-black p-2'>
              <img src={product.image_url} alt={`Slide ${index}`} className="mx-auto border border-black w-3/4 h-full object-cover" />
              <Link to={`/product-details/${product.id}`} className='flex flex-col items-center justify-center'>
                <p className='h-10 text-sm font-semibold text-center'>{product.brand} {product.name}</p>
                <p className='text-sm text-center'>${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default Slider;