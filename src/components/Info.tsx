import { Link } from 'react-router-dom';
import { FaAnglesDown } from 'react-icons/fa6';

//  "Greetings, I am a full stack developer with a passion for creating user-friendly and responsive web applications"
//"Greetings, I am a JS software developer with a previous career in the medical industry. I love building web applications. I’m looking for a team where I can further grow my software engineering skills"
//"Greetings, I am a JS software developer with a previous career in the medical industry. I love building web applications and I am currently seeking a team where I can further grow my software engineering skills"

// Info data type
type InfoData = {
  title: string;
  hello: string;
  description: string;
  skills: string;
  projects: string;
  or: string;
};

// Info component
const Info = ({ info }: { info: InfoData }) => {
  /**
   * Scrolls to the specified element on the page
   * @param id - The ID of the element to scroll to
   */
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="info" className="flex flex-col sm:flex-row items-center sm:items-center  min-h-[calc(100vh-5rem)] relative">
      {/* Info container */}
      <div className="mt-10 sm:pb-20 px-2 w-full sm:w-2/3 slide-up-fade-in">
        {/* Main info */}
        <h1 className="text-color-3 text-3xl min-[380px]:text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 min-[380px]:mb-5"> {info.title}</h1>
        <p className="text-color-1  text-lg leading-6 min-[380px]:text-xl-custom sm:text-2xl font-medium  tracking-normal mb-4 min-[380px]:mb-5  ">
          {info.hello} <br></br> {info.description}
        </p>
        {/* Links */}
        <span className=" text-color-3 font-extrabold text-base min-[380px]:text-lg sm:text-xl ">
          <Link to="/" onClick={() => scrollTo('skills')}>
            {info.skills}
          </Link>
        </span>
        <span className="text-color-1 font-medium text-sm min-[380px]:text-base sm:text-lg  mx-2">{info.or}</span>
        <span className=" text-color-3 font-extrabold text-base min-[380px]:text-lg sm:text-xl ">
          <Link to="/" onClick={() => scrollTo('projects')}>
            {info.projects}
          </Link>
        </span>
      </div>
      {/* Scroll down button */}
      <button onClick={() => scrollTo('skills')}>
        <FaAnglesDown className=" text-color-3 absolute bottom-5 sm:bottom-5 left-1/2 transform -translate-x-1/2 w-10 h-10"></FaAnglesDown>
      </button>
      {/* Text on background */}
      {/* <div className="absolute top-0 left-0 right-0 mx-auto text-8xl  z-[-1] opacity-[0.05] w-full text-center font-black">Hire me</div> */}
      {/* Text img on background */}
      {/* <img src="assets/img/developer_text1.svg" alt="developer" className="absolute top-[-45vh] h-[1000px] w-full  z-[-1] opacity-[0.05] " /> */}
      {/* Image on the right */}
      <img src="assets/img/info-image1.svg" alt="developer" className="sm:absolute mb-12 sm:mb-0 bottom-28 sm:bottom-auto right-[27%] sm:right-0 w-[45%] sm:w-1/3 reveal  sm:max-h-full" />
      {/* background image */}
      <img src="assets/img/info_background1.jpg" alt="Hero" className="absolute top-0 right-0 w-full h-[calc(100%+5rem)] transform translate-y-[-5rem] z-[-1] opacity-[0.1] object-cover" />
    </section>
  );
};

export default Info;
