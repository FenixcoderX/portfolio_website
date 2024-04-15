import './App.css';
import allData from './assets/data.json';
import NavBar from './components/NavBar';
import Info from './components/Info';
import Skills from './components/Skills';
import ProjectList from './components/ProjectList';
import { Fragment, useState, useEffect } from 'react';
import { getGeoIp } from './utils/apiCalls';

// Main component of the application
const App = () => {
  // State to store the selected language
  const [language, setlanguage] = useState('en');

  /**
   * Toggles the language between 'ru' and 'en'.
   */
  const changeLanguage = () => {
    language === 'ru' ? setlanguage('en') : setlanguage('ru');
  };

  useEffect(() => {
    /** Fetches ip data from API
     */
    const getIp = async () => {
      try {
        const res = await getGeoIp();

        console.log('getGeoIp Response from API:', res);
      } catch (error) {
        console.error('Error fetching IP data:', error);
      }
    };

    getIp();

  }, []);

  // Load the data based on the selected language
  let data;
  if (language === 'ru') {
    data = allData.ru;
  } else {
    data = allData.en;
  }

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
