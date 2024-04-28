import { FaAnglesDown } from 'react-icons/fa6';
import { TbHeartFilled } from 'react-icons/tb';

// Footer data type
type FooterData = {
  info: string;
  copyright1: string;
  copyright2: string;
};

// Footer component
const Footer = ({ footer, language }: { footer: FooterData; language: string | null }) => {
  /**
   * Scrolls to the specified element on the page
   * @param id - The ID of the element to scroll to
   */
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="footer" className="relative ">
      <div className="px-2">
        {/* Footer text */}
        <div className="text-color-1 text-base sm:text-lg  text-center font-medium  tracking-normal mb-5 mt-14">{footer.info}</div>
       {/* Footer text depending on the language */}
        {language === 'en' && (
          <div className="text-color-3 font-medium text-xs sm:text-sm text-center  leading-6">
            {footer.copyright1}{' '}
            <span className="inline-flex">
              <TbHeartFilled className="transform -translate-y-[-2px]" />
            </span>{' '}
            {footer.copyright2}
          </div>
        )}
        {language === 'ru' && (
          <div className="text-color-3 font-medium text-xs sm:text-sm text-center  leading-6">
            {footer.copyright1} {footer.copyright2}
          </div>
        )}
      </div>
       {/* Scroll up button */}
      <button onClick={() => scrollTo('navbar')}>
        <FaAnglesDown className=" text-color-3 absolute top-[-60px] left-1/2 transform -translate-x-1/2 rotate-180 w-10 h-10"></FaAnglesDown>
      </button>
    </section>
  );
};

export default Footer;
