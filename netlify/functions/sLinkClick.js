/**
 * Makes a POST request to the server's sLinkClick endpoint
 * @param event - The data to be sent in the request body
 */
exports.handler = async function (event, context) {
  // Check if the request is a POST request
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // console.log('event.body', event.body);
  const clickData = JSON.parse(event.body);
  // Add the password to the data object that needs to be sent to the API to authenticate the request
  clickData.password = process.env.REACT_APP_ANALYTIC_API_PASSWORD;
  // console.log('clickData', clickData);

  try {
    await fetch(`${process.env.REACT_APP_ANALYTIC_API_URL}/sLinkClick`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickData),
    });
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error('Error to POST sLinkClick fetch request to API', error);
    return {
      statusCode: 200,
    };
  }
};
