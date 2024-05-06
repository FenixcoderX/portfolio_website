// import Carousel from "./Carousel"; // Custom carousel where div containers scrolling. Final version
// import Carousel from "./CarouselDiv"; //Custom carousel where div containers div appears and disappears
// import Carousel from "./CarouselImg"; //Custom carousel where img scrolling
import Carousel from './CarouselSwipe'; //Carousel using swiper
import { IoLogoGithub, IoMdOpen } from 'react-icons/io';
import { useEffect, useState, useRef } from 'react';
//import { sLinkClick } from '../utils/apiCalls';

type ProjectsData = {
  title: string;
  description: string;
  list: { name: string; description: string; tech_stack: string[]; img: string[]; linkGithub: string; LinkWebsite: string; bgcolor: string }[];
};

// ProjectList component
const ProjectList = ({ projects }: { projects: ProjectsData }) => {
  //---------- Сollect data
  const saveClick = (e: any) => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    //---------- Frontend fetch
    //sLinkClick({ link: e.target.href, date: new Date().toLocaleString('en-GB'), id: user.id });
    //----------
    //---------- Fetch from Netlify function
    fetch(`/.netlify/functions/sLinkClick`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link: e.target.href, date: new Date().toLocaleString('en-GB'), id: user.id }),
    });
    //----------
    // if (user.clicks) {

    //   user.clicks.push([e.target.href,new Date().toLocaleString('en-GB')]);

    // } else {
    //   user.clicks = [[e.target.href,new Date().toLocaleString('en-GB')]];
    // }
    // console.log ('user', user);
    // localStorage.setItem('user', JSON.stringify(user));

    // console.log('saveClick', e.target.href);
  };
  //----------

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
    // eslint-disable-next-line 
  }, []);

  return (
    <section id="projects" className="pt-[30px]">
      <div className="flex items-center flex-col ">
        {/* Display the title and description */}

        <h1 className="text-color-1 text-base  font-normal tracking-widest my-3"> {projects.title.toUpperCase()}</h1>
        <p ref={ref} className={`opacity-0 text-color-3 font-extrabold text-4xl tracking-tight text-center px-6 ${isVisible ? 'slide-up-fade-in' : ''}`}>
          {projects.description}
        </p>

        {/* Container for all projects */}
        <div className="flex flex-wrap justify-evenly mx-0 my-3.5 ">
          {/* <div className="flex flex-wrap justify-evenly mx-1.5 my-3.5 border-gray-600 border-2 "> */}
          {/* map through the list of projects array */}
          {projects.list.map((project, index) => (
            // Container for the project
            <div style={{ backgroundColor: `${project.bgcolor}` }} className={` flex items-center  w-full ${index % 2 === 0 ? 'flex-col-reverse lg:flex-row-reverse ' : 'flex-col-reverse lg:flex-row-reverse'} mx-0 my-3.5  bg-[${project.bgcolor}]`} key={index}>
              {/* Container for the project images with carousel */}
              <div className="w-[98vw] lg:w-[55vw]  sm:p-4 max-w-[950px] m-auto">
                <Carousel images={project.img} />
                {/* <Carousel/> */}
              </div>

              {/* Container for the project details */}
              <div className="w-[85vw] lg:w-[40vw]  max-w-[950px]   flex items-center flex-col lg:ml-7  mt-8 lg:my-8 ">
                <h2 className="text-color-1 text-3xl font-extrabold tracking-tight  text-center mb-8">{project.name}</h2>
                <p className=" text-color-4 text-base sm:text-lg sm:leading-6 tracking-normal mb-8" dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, '<br />') }}></p>
                {/* dangerouslySetInnerHTML is used to render the HTML tags in the string */}
                
                {/* Display the tech stack */}
                <div className="flex flex-wrap justify-center px-4 ">
                  {project.tech_stack.map((tech, index) => (
                    <span key={tech} className="flex">
                      <span className="text-color-4 font-medium px-2 text-center text-xs sm:text-sm leading-6">{tech}</span>
                      <span className="text-color-2 font-medium text-xs sm:text-sm leading-6">{index < project.tech_stack.length - 1 ? '/' : ''} </span>
                    </span>
                  ))}
                </div>
                {/* Links to the project repository with GitHub icon and to the website with Open icon */}
                <span className="pt-2">
                  <a href={project.linkGithub} onClick={saveClick} target="_blank" rel="noreferrer" className="px-2 py-1 mt-2  text-color-1 text-lg leading-6 font-extrabold tracking-normal  rounded-md ">
                    <IoLogoGithub className="inline pb-[0.18rem] text-3xl "></IoLogoGithub> GitHub
                  </a>
                  {project.LinkWebsite !== '' && (
                    <a href={project.LinkWebsite} onClick={saveClick} target="_blank" rel="noreferrer" className="px-2 py-1 mt-2  text-color-1 text-lg leading-6 font-extrabold tracking-normal  rounded-md ">
                      <IoMdOpen className="inline pb-[0.18rem] text-3xl "></IoMdOpen> Website
                    </a>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
