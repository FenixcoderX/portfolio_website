// import Carousel from "./Carousel"; // Custom carousel where div containers scrolling. Final version
// import Carousel from "./CarouselDiv"; //Custom carousel where div containers div appears and disappears
// import Carousel from "./CarouselImg"; //Custom carousel where img scrolling
import Carousel from './CarouselSwype'; //Carousel using swiper
import { IoLogoGithub } from 'react-icons/io';

type projects = {
  title: string;
  description: string;
  list: { name: string; description: string; tech_stack: string[]; img: string[]; link: string }[];
};

// ProjectList component
const ProjectList = ({ projects }: { projects: projects }) => {
  return (
    <section id="projects" className="">
      <div className="flex items-center flex-col border-4 border-amber-800">
        {/* Display the title and description */}
        <h1 className="text-color-1 text-base  font-normal tracking-widest my-3 mt-10"> {projects.title.toUpperCase()}</h1>
        <p className="text-color-3 font-extrabold text-4xl tracking-tight text-center">{projects.description}</p>

        {/* Container for all projects */}
        <div className="flex flex-wrap justify-evenly mx-1.5 my-3.5 border-2 border-amber-500">
          {/* <div className="flex flex-wrap justify-evenly mx-1.5 my-3.5 border-gray-600 border-2 "> */}
          {/* map through the list of projects array */}
          {projects.list.map((project, index) => (
            // Container for the project
            <div className={` flex items-center ${index % 2 === 0 ? 'flex-col-reverse sm:flex-col-reverse ' : 'flex-col-reverse sm:flex-col-reverse'} mx-1.5 my-3.5 bg-slate-50`} key={index}>
              {/* <div className={` flex items-center ${index % 2 === 0 ? 'flex-col-reverse sm:flex-col-reverse ' : 'flex-col-reverse sm:flex-col-reverse'} mx-1.5 my-3.5 bg-slate-800 `} key={index}> */}
              {/* Container for the project images with carousel */}
              <div className="w-[88vw] sm:w-[55vw] xl:w-[50vw] sm:p-4 max-w-[950px] m-auto border-4 border-black">
                <Carousel images={project.img} />
                {/* <Carousel/> */}
              </div>

              {/* Container for the project details */}
              <div className="w-[88vw] sm:w-[40vw] xl:w-[30vw] max-w-[500px] mx-3.5 my-3.5 flex items-center flex-col border-2 border-black">
                <h2 className="text-color-3 text-3xl font-extrabold tracking-tight  text-center mb-3">{project.name}</h2>
                <p className=" text-color-1 text-lg leading-6 tracking-normal text-center mb-3">{project.description}</p>
                {/* Display the tech stack */}
                <div className="flex flex-wrap justify-center mt-2">
                  {project.tech_stack.map((tech, index) => (
                    <span key={tech} className="flex">
                      <span className="text-color-3 font-medium px-2 text-center text-sm leading-6">{tech}</span>
                      <span className="text-color-2 font-medium text-sm leading-6">{index < project.tech_stack.length - 1 ? '/' : ''} </span>
                    </span>
                  ))}
                </div>
                {/* link to the project repository with GitHub icon */}
                <a href={project.link} target="_blank" rel="noreferrer" className="px-2 py-1 mt-2  text-color-1 text-lg leading-6 font-extrabold tracking-normal  rounded-md ">
                  <IoLogoGithub className="inline pb-[0.18rem] text-3xl "></IoLogoGithub> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
