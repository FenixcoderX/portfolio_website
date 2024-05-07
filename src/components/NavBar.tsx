import { Link } from 'react-router-dom';

type NavData = {
  logo: string;
  skills: string;
  projects: string;
  language: string;
};

const NavBar = ({ nav, changeLanguage }: { nav: NavData; changeLanguage: Function }) => {
  /**
   * Scrolls to the specified element on the page
   * @param id - The ID of the element to scroll to
   */
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="navbar" className="h-20">
      <div className="flex justify-between items-center px-2.5 py-2.5">
        {/* Logo */}
        <div>
          <img className="w-14 h-14" src={nav.logo} alt="Logo" />
        </div>

        {/* Navigation links */}
        <div className="flex">
          <ul className=" justify-start w-[186px] hidden min-[380px]:flex">
          <li className="px-2.5 text-color-3 font-extrabold  text-center  leading-6  text-xs  sm:text-sm tracking-wide ">
            <Link to="/" onClick={() => scrollTo('skills')}>
              {nav.skills.toUpperCase()}
            </Link>
          </li>
          <li className="px-2.5  text-color-3 font-extrabold  text-center  leading-6  text-xs  sm:text-sm tracking-wide ">
            <Link to="/" onClick={() => scrollTo('projects')}>
              {nav.projects.toUpperCase()}
            </Link>
          </li>
          </ul>
          {/* Change language */}
          <div className="px-9   text-color-3 font-extrabold text-center  leading-6 text-xs sm:text-sm tracking-wide">
            <button onClick={() => changeLanguage()}>{nav.language.toUpperCase()}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
