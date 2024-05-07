/**
 * Fetches the geolocation information based on the user's IP address.
 * @returns {Promise<any>} A promise that resolves to the geolocation information.
 */
export const getGeoIp = async () => {
  try {
    const response = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.REACT_APP_API_KEY}`, {
      method: 'GET',
    });
    // If response is OK (status 200), return the result or null if the response is not OK
    if (response.status === 200) {
    const result = await response.json();
    return result;}
    else {
      return null;
    }
  } catch (error) {
    console.error('Error to get IP fetch request to API', error);
  }
};

type FirstVisitData = {
  country: string;
  ip: string;
  firstVisit: string;
  id: string;
};

/**
 * Makes a POST request to the server's sFirstVisit endpoint
 * @param firstVisitData - The data to be sent in the request body
 */
export const sFirstVisit = async (firstVisitData: FirstVisitData) => {

  try {
    // const response = await fetch(`http://localhost:3001/sFirstVisit`, {
    await fetch(`${process.env.REACT_APP_ANALYTIC_API_URL}/sFirstVisit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(firstVisitData),
    });
  } catch (error) {
    console.error('Error to POST sFirstVisit fetch request to API', error);
  }
};

/**
 * Makes a POST request to the server's sNextVisit endpoint
 */
export const sNextVisit = async () => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const nextVisitData = { nextVisit: new Date().toLocaleString('en-GB'), id: user.id };
  try {
    await fetch(`${process.env.REACT_APP_ANALYTIC_API_URL}/sNextVisit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nextVisitData),
    });
  } catch (error) {
    console.error('Error to POST sNextVisit fetch request to API', error);
  }
};

type ClickData = {
  link: string;
  date: string;
  id: string;
};

/**
 * Makes a POST request to the server's sLinkClick endpoint
 * @param clickData - The data to be sent in the request body
 */
export const sLinkClick = async (clickData: ClickData) => {
  console.log('clickData', JSON.stringify(clickData));
  try {
    await fetch(`${process.env.REACT_APP_ANALYTIC_API_URL}/sLinkClick`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickData),
    });
  } catch (error) {
    console.error('Error to POST sLinkClick fetch request to API', error);
  }
};
