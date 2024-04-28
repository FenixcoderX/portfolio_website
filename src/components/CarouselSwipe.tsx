// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';

import { useEffect, useState, useRef } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';

type Images = string[];

// Carousel component
const Carousel = ({ images }: { images: Images }) => {
  // State to check if the element is visible and trigger the animation
  const [isVisible, setIsVisible] = useState(false); // State to check if the element is visible and trigger the animation
  const [lastScrollTop, setLastScrollTop] = useState(0); // State to store the last scroll position to determine the scroll direction
  const ref = useRef(null); // Ref to the animated element

  //
  /**
   * Handles the scroll event and determines if the component is visible in the viewport. Only for scrolling down
   */
  const onScroll = () => {
    //@ts-ignore
    const rect = ref.current.getBoundingClientRect(); // Get the bounding client rect of the element (the size of the element and its position relative to the viewport)
    const scrollTop = document.documentElement.scrollTop; // Returns the Element that is the root element of the document. The scrollTop property gets or sets the number of pixels that the content of an element is scrolled upward.

    // If the element is in the viewport and the scroll direction is down, set the element to visible
    if (scrollTop > lastScrollTop) {
      // Scrolling down
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
      }
    } else {
      // Scrolling up
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setIsVisible(false);
      }
    }
    // Set the last scroll position to the current scroll position, to determine the scroll direction
    setLastScrollTop(scrollTop);
  };

  useEffect(() => {
    // Add the scroll event listener and remove it when the component is unmounted
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Swiper
      ref={ref}
      style={{
        //@ts-ignore
        '--swiper-pagination-color': '#0f141e',
        '--swiper-pagination-bullet-inactive-color': '#878a8f',
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-width': '5px',
        '--swiper-pagination-bullet-height': '5px',
        '--swiper-pagination-bullet-horizontal-gap': '6px',
        '--swiper-pagination-bottom': '25px',
        '--swiper-navigation-size': '75px',
        '--swiper-navigation-top-offset': '50%',
        '--swiper-navigation-sides-offset': '10px',
      }}
      className={`change-swiper-container ${isVisible ? 'reveal2' : ''}`}
      modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard]}
      spaceBetween={10}
      slidesPerView={1}
      cssMode={true}
      navigation
      pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 2 }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper: any) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      keyboard={{
        enabled: true,
        onlyInViewport: false,
      }}
    >
      {/* Map through the images and create a slide for each one */}
      {images.map((image, index) => (
        <SwiperSlide key={index} className="pt-2 sm:pt-0">
          <img src={image} alt={`Slide ${index}`} className="mx-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
