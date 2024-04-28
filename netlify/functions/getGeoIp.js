/**
 * Fetches the geolocation information based on the user's IP address.
 * @returns {Promise<any>} A promise that resolves to the geolocation information.
 */
exports.handler = async function (event, context) {
  
  // Check if the request is a POST request
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  // Parse the IP address from the request body
  const ip = JSON.parse(event.body);
  try {
    const response = await fetch(`https://api.geoapify.com/v1/ipinfo?ip=${ip.ip}&apiKey=${process.env.REACT_APP_API_KEY}`, {
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
    console.error('Error to get IP fetch request to API', error);
    return {
      statusCode: 200,
      body: null,
    };
  }
};
