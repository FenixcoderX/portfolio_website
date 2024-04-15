// export const getGeoIp = () =>
//   fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.REACT_APP_API_KEY}`, {
//     method: 'GET',
//   })
//     .then((response) => response.json())
//     .then((result) => result)
//     .catch((error) => {

//      console.error('Error to get IP fetch request to API', error);
//       throw error;
//     });

/**
 * Fetches the geolocation information based on the user's IP address.
 * @returns {Promise<any>} A promise that resolves to the geolocation information.
 */
export const getGeoIp = async () => {
  try {
    const response = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.REACT_APP_API_KEY}`, {
      method: 'GET',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error to get IP fetch request to API', error);
  }
};
