import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
        {products.map((product, index) => (
          <div key={index} className="flex-shrink-0 h-full w-full p-1">
            <div className='w-full h-full flex flex-col border border-black'>
              <img src={product.image_url} alt={`Slide ${index}`} className="mx-auto border border-black w-full h-24 object-cover" />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default MovingImages;
