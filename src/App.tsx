import './App.css';
import allData from './assets/data.json';
import NavBar from './components/NavBar';
import Info from './components/Info';
import Skills from './components/Skills';
import ProjectList from './components/ProjectList';
import Footer from './components/Footer';
import { Fragment, useState, useEffect } from 'react';
import { getGeoIp, sFirstVisit, sNextVisit } from './utils/apiCalls';
import { ThreeDots } from 'react-loader-spinner';

// Data type for the data fetched from the JSON file (main data of the app)
type Data = {
  nav: { logo: string; skills: string; projects: string; language: string };
  info: { title: string; hello: string; description: string; skills: string; projects: string; or: string };
  skills: { title: string; description: string; category: { name: string; list: string[] }[] };
  projects: {
    title: string;
    description: string;
    list: {
      name: string;
      description: string;
      tech_stack: string[];
      img: string[];
      linkGithub: string;
      LinkWebsite: string;
      bgcolor: string;
    }[];
  };
  footer: { info: string; copyright1: string; copyright2: string };
};

// Main component of the application
const App = () => {
  // State to store the selected language
  const [language, setlanguage] = useState(localStorage.getItem('language'));
  // State to store the data fetched from the JSON file
  const [data, setData] = useState<Data>({
    nav: { logo: '', skills: '', projects: '', language: '' },
    info: { title: '', hello: '', description: '', skills: '', projects: '', or: '' },
    skills: { title: '', description: '', category: [{ name: '', list: [''] }] },
    projects: {
      title: '',
      description: '',
      list: [
        {
          name: '',
          description: '',
          tech_stack: [''],
          img: [''],
          linkGithub: '',
          LinkWebsite: '',
          bgcolor: '',
        },
      ],
    },
    footer: { info: '', copyright1: '', copyright2: '' },
  });
  // State to store the loading state
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Toggles the language between 'ru' and 'en' and saves it to local storage
   */
  const changeLanguage = () => {
    if (language === 'ru') {
      setlanguage('en');
      localStorage.setItem('language', 'en');
    } else {
      setlanguage('ru');
      localStorage.setItem('language', 'ru');
    }
  };

  useEffect(() => {
    /** Fetches IP data from API and sets the language based on the country or previously selected language
     */
    const getIpAndSetLanguage = async () => {
      setIsLoading(true); // Start loading

      try {
        // Check if the language is not set in the local storage
        if (localStorage.getItem('language') === null) {
          //---------- Frontend fetch
          //const res = await getGeoIp(); // Fetch the IP data
          //----------

          //---------- Fetch from Netlify function
          const res = await fetch(`/.netlify/functions/getGeoIp`)
            .then((res) => res.json())
            .catch((err) => {}); // Fetch the IP data
          //----------

          // console.log('response from GeoAPI', res);

          //---------- Сollect data
          const id = Math.random().toString(36).substring(2, 15);
          if (res && res.country.iso_code && res.ip) {
            // localStorage.setItem('user', JSON.stringify({ country: res.country.iso_code, ip: res.ip, firstVisit: new Date().toLocaleString('en-GB'), id: id }));
            localStorage.setItem('user', JSON.stringify({ id: id }));
            //---------- Frontend fetch
            // sFirstVisit({ country: res.country.iso_code, ip: res.ip, firstVisit: new Date().toLocaleString('en-GB'), id: id });
            //----------
            //---------- Fetch from Netlify function
            fetch(`/.netlify/functions/sFirstVisit`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ country: res.country.iso_code, ip: res.ip, firstVisit: new Date().toLocaleString('en-GB'), id: id }),
            });
            //----------
          } else {
            // localStorage.setItem('user', JSON.stringify({ country: 'unknown', ip: 'unknown', firstVisit: new Date().toLocaleString('en-GB'), id: id }));
            localStorage.setItem('user', JSON.stringify({ id: id }));
            //---------- Frontend fetch
            // sFirstVisit({ country: 'unknown', ip: 'unknown', firstVisit: new Date().toLocaleString('en-GB'), id: id });
            //----------
            //---------- Fetch from Netlify function
            fetch(`/.netlify/functions/sFirstVisit`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ country: 'unknown', ip: 'unknown', firstVisit: new Date().toLocaleString('en-GB'), id: id }),
            });
            //----------
          }
          //----------

          // console.log('response from GeoAPI', res);
          // Check if the country is Russia to set the language to Russian otherwise set it to English
          if (res && res.country.iso_code === 'RU') {
            setlanguage('ru');
            localStorage.setItem('language', 'ru');
          } else {
            setlanguage('en');
            localStorage.setItem('language', 'en');
          }
        } else {
        }

        // Set data depend on the language
        // Check if the language is not null to not set the data until the language is set
        if (language !== null) {
          if (language === 'ru') {
            setData(allData.ru);
            setIsLoading(false); // End loading
          } else {
            setData(allData.en);
            setIsLoading(false); // End loading
          }
        }
      } catch (error) {
        console.error('Error fetching IP data:', error);
      }
    };

    getIpAndSetLanguage();
  });

  //---------- Сollect data
  useEffect(() => {
    if (localStorage.getItem('user')) {
      //---------- Frontend fetch
      // sNextVisit();
      //----------
      //---------- Fetch from Netlify function
      fetch(`/.netlify/functions/sNextVisit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: JSON.parse(localStorage.getItem('user') ?? '').id }),
      });
      //----------
      // const user = JSON.parse(localStorage.getItem('user') as string);
      // if (user.visit) {
      //   //////// This check only needed in developer mode, because of React.StrictMode (component renders twice in dev mode)
      //   if (user.visit[user.visit.length - 1] !== new Date().toLocaleString('en-GB')) {
      //     user.visit.push(new Date().toLocaleString('en-GB'));
      //   }
      //   ////////
      // } else {
      //   user.visit = [new Date().toLocaleString('en-GB')];
      // }
      // localStorage.setItem('user', JSON.stringify(user));
      //console.log('user',user);
    }
  }, []);
  //----------

  // Show loading spinner while fetching the data
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ThreeDots visible={true} height="80" width="80" color="#0f141e" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="" />
      </div>
    );
  } else {
    // Render the main components of the app
    return (
      <Fragment>
        <div>
          {/* <img src="assets/img/info_background1.jpg" alt="Hero" className="absolute right-0 w-full h-lvh z-[-1] opacity-[0.1] object-cover" /> */}

          <NavBar nav={data.nav} changeLanguage={changeLanguage} />
          <Info info={data.info} />
        </div>
        <Skills skills={data.skills} />
        <ProjectList projects={data.projects} />
        <Footer footer={data.footer} language={language} />
      </Fragment>
    );
  }
};

export default App;
