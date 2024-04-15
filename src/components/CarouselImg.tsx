import { useState } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { useSwipeable } from 'react-swipeable'; // Add swipe functionality to the carousel

// Carousel images data type
type images = string[];

// Carousel component with images
export default function Carousel({ images }: { images: images }) {
  let [current, setCurrent] = useState(0);

  // Swipe hook handlers for the carousel
  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => previousImage(),
    // preventDefaultTouchmoveEvent: true,
    preventScrollOnSwipe: true, //
    trackMouse: true,
  });

  /**
   * Moves to the previous image in the carousel
   */
  let previousImage = () => {
    if (current !== 0) {
      setCurrent(current - 1);
    }
  };

  /**
   * Moves to the next image in the carousel
   */
  let nextImage = () => {
    if (current !== images.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    // Container for the carousel to add swipe functionality
    <div {...handlers} className="carousel-container">
      {/*  Container for the carousel which hides the overflowing images and sets position relative */}
      <div className="overflow-hidden relative pb-8 my-8 border-green-700 border-2">
        {/* Container that holds all the images and moves them based on the value of current variable */}
        <div
          className={`flex transition ease-out duration-500`}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((img, index) => {
            return <img src={img} alt={'img' + (index + 1)} key={index} className='object-contain'/>;
          })}
        </div>

        {/* Buttons to move to the previous and next images */}
        <div className="absolute top-0 flex justify-end items-end h-full w-full text-white text-3xl   ">
          <button onClick={previousImage} className="z-10 opacity-50 hover:opacity-100 disabled:opacity-20" disabled={current === 0 ? true : false}>
            <IoIosArrowDropleftCircle className="text-black" />
          </button>

          <button onClick={nextImage} className="z-10 opacity-50 hover:opacity-100 disabled:opacity-20" disabled={current === images.length - 1 ? true : false}>
            <IoIosArrowDroprightCircle className=" text-black" />
          </button>
        </div>

        {/* Image indicators at the bottom of the carousel */}
        <div className="absolute bottom-0 py-5 flex justify-start gap-3 w-full">
          {images.map((_, index) => {
            return (
              <div
                onClick={() => {
                  setCurrent(index);
                }}
                key={'oval' + index}
                className={`rounded-full cursor-pointer transition ease-out duration-500 ${index === current ? 'bg-white w-8 h-1 ' : 'w-4 h-1 bg-gray-500'}`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
