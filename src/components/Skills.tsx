import { useEffect, useState, useRef } from 'react';
import { FaAnglesDown } from "react-icons/fa6";

// Skills data type
type SkillsData = {
  title: string;
  description: string;
  category: { name: string; list: string[] }[];
};

// Skills component
const Skills = ({ skills }: { skills: SkillsData }) => {
/**
   * Scrolls to the specified element on the page
   * @param id - The ID of the element to scroll to
   */
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
};

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
    <section id="skills" className="relative min-h-[100vh] pt-[30px] pb-[70px] ">
      <div className="flex items-center flex-col ">
        {/* Display the title and description */}
        {/* <h1 className="text-3xl font-bold "> {skills.title}</h1> */}
        {/* <h1 className="text-color-3 font-extrabold text-4xl tracking-tight text-center"> {skills.title}</h1>
        <p className=" text-color-1 font-normal text-lg leading-6 tracking-normal text-center">{skills.description}</p> */}

        <h1 className="text-color-1 text-base  font-normal tracking-widest my-3"> {skills.title.toUpperCase()}</h1>
        <p ref={ref} className={`opacity-0 text-color-3 font-extrabold text-4xl tracking-tight text-center ${isVisible ? 'slide-up-fade-in' : ''}`}>
          {skills.description}
        </p>

        {/* Display the skills */}
        <div className="flex flex-wrap justify-evenly mx-3.5 my-3.5">
          {/* map through the category array */}
          {skills.category.map((category) => (
            <div key={category.name} className="sm:w-1/3 w-2/3 mx-3.5 my-3.5 flex items-center flex-col">
              <h2 className="text-sm text-center text-color-1 tracking-widest font-normal mb-1">{category.name.toUpperCase()}</h2>
              <div className="flex justify-center  flex-wrap">
                {/* map through the list array inside the category object */}
                {category.list.map((item, index) => (
                  <span key={item} className="flex items-end">
                    <span className="text-color-3 font-extrabold px-2 text-center text-lg leading-6">{item}</span>
                    <span className="text-color-2 font-medium text-lg leading-6 ">{index < category.list.length - 1 ? '/' : ''} </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => scrollTo('projects')} >
      <FaAnglesDown className=" text-color-3 absolute bottom-5 left-1/2 transform -translate-x-1/2 w-10 h-10">          
      </FaAnglesDown>
      </button>
    </section>
  );
};

export default Skills;
