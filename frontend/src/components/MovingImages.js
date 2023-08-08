import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const numbers = ["Image 1", "Image 2", "Image 3", "Image 4", "Image 5"]

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const MovingImages = ({products}) => {
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        items={3}
        autoPlay={false}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        partialVisible={false}
        // dotListClass="custom-dot-list-style"
      >
        {numbers.map((number, index) => (
          <div key={index} className="flex-shrink-0 h-full w-full p-1">
            <div className='w-full h-full flex flex-col border border-gray-200 items-center justify-center'>
              {/* <img src={product.image_url} alt={`Slide ${index}`} className="mx-auto w-24 h-24 object-cover" /> */}
              <p className="text-xl font-semibold text-center h-24 pt-8">{number}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default MovingImages;
