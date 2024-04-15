import { Link } from 'react-router-dom';

// Info data type
type info = {
  title: string;
  description: string;
  skills: string;
  projects: string;
  or: string;
};

// Info component
const Info = ({ info }: { info: info }) => {
  /**
   * Scrolls to the specified element on the page
   * @param id - The ID of the element to scroll to
   */
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // <section id="info" className="flex items-center bg-gray-100 h-[calc(100vh-5rem)]">
    <section id="info" className="flex items-center  h-[calc(100vh-5rem)]">
      {' '}
      <div className="mt-20">
        {/* Main info */}
        <h1 className="text-color-3 text-4xl sm:text-6xl font-extrabold tracking-tight mb-5"> {info.title}</h1>
        <p className="text-color-1 text-xl sm:text-2xl   font-medium  tracking-normal mb-5">{info.description}</p>
        {/* Links */}
        <span className=" text-color-3 font-extrabold  text-xl ">
          <Link to="/" onClick={() => scrollTo('skills')}>
            {info.skills}
          </Link>
        </span>
        <span className="text-color-1 font-medium text-lg  mx-2">{info.or} </span>
        <span className=" text-color-3 font-extrabold  text-xl ">
          <Link to="/" onClick={() => scrollTo('projects')}>
            {info.projects}
          </Link>
        </span>
      </div>
    </section>
  );
};

export default Info;

//TODO Add arrow down to scroll to the next section
