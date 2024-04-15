// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';

type images = string[];

// Carousel component
const Carousel = ({ images }: { images: images }) => {
  return (
    <Swiper
      style={{
        //@ts-ignore
        '--swiper-pagination-color': '#0f141e',
        '--swiper-pagination-bullet-inactive-color': '#878a8f',
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-width': '20px',
        '--swiper-pagination-bullet-height': '5px',
        '--swiper-pagination-bullet-horizontal-gap': '6px',
        '--swiper-navigation-size': '75px',
        '--swiper-navigation-top-offset': '50%',
        '--swiper-navigation-sides-offset': '10px',
        '--swiper-pagination-bottom': '45px',
      }}
      className={'change-swiper-container'}
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
        //<SwiperSlide key={index} className ='h-[32vh] p-2'>
        //<img src={image} alt={`Slide ${index}`} className ='mx-auto h-full object-contain' />
        //</SwiperSlide>
        <SwiperSlide key={index} className="pt-2 sm:pt-0">
          <img src={image} alt={`Slide ${index}`} className="mx-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
