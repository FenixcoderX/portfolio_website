/**
 * Fetches the geolocation information based on the user's IP address.
 * @returns {Promise<any>} A promise that resolves to the geolocation information.
 */
exports.handler = async function (event, context) {
  try {
    const response = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.REACT_APP_API_KEY}`, {
      method: 'GET',
    });
    // If response is OK (status 200), return the result or null if the response is not OK
    if (response.status === 200) {
      const result = await response.json();
      //console.log ("result",JSON.stringify(result))
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } else {
       // const result = await response.json();
       // console.log ("result",JSON.stringify(result))
      return {
        statusCode: 200,
        body: null,
      };
    }
  } catch (error) {
    console.error('Error to get IP fetch request to API', error)
    return {
        statusCode: 200,
        body: null,
      };
  }
};
