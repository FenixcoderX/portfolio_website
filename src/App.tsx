import './App.css';
import allData from './assets/data.json';
import NavBar from './components/NavBar';
import Info from './components/Info';
import Skills from './components/Skills';
import ProjectList from './components/ProjectList';
import { Fragment, useState, useEffect } from 'react';
import { getGeoIp } from './utils/apiCalls';

// Data type for the data fetched from the JSON file (main data of the app)
type Data = {
  nav: { logo: string; skills: string; projects: string; language: string };
  info: { title: string; description: string; skills: string; projects: string; or: string };
  skills: { title: string; description: string; category: { name: string; list: string[] }[] };
  projects: {
    title: string;
    description: string;
    list: {
      name: string;
      description: string;
      tech_stack: string[];
      img: string[];
      link: string;
    }[];
  };
};

// Main component of the application
const App = () => {
  // State to store the selected language
  const [language, setlanguage] = useState(localStorage.getItem('language'));
  // const [country, setCountry] = useState('');
  // State to store the data fetched from the JSON file
  const [data, setData] = useState<Data>({
    nav: { logo: '', skills: '', projects: '', language: '' },
    info: { title: '', description: '', skills: '', projects: '', or: '' },
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
          link: '',
        },
      ],
    },
  });

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
      try {
        // Check if the language is not set in the local storage
        if (localStorage.getItem('language') === null) {
          const res = await getGeoIp(); // Fetch the IP data

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
          } else {
            setData(allData.en);
          }
        }
      } catch (error) {
        console.error('Error fetching IP data:', error);
      }
    };

    getIpAndSetLanguage();
  });

  // //Load the data based on the selected language
  // let data;
  // if (language === 'ru') {
  //   data = allData.ru;
  // } else {
  //   data = allData.en;
  // }

  return (
    <Fragment>
      <NavBar nav={data.nav} changeLanguage={changeLanguage} />
      <Info info={data.info} />
      <Skills skills={data.skills} />
      <ProjectList projects={data.projects} />
    </Fragment>
  );
};

export default App;
