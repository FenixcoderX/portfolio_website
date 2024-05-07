/**
 * Makes a POST request to the server's sNextVisit endpoint
 */
exports.handler = async function (event, context) {
  // Check if the request is a POST request
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const user = JSON.parse(event.body);

  const nextVisitData = { nextVisit: new Date().toLocaleString('en-GB'), id: user.id };
  // Add the password to the data object that needs to be sent to the API to authenticate the request
  nextVisitData.password=process.env.REACT_APP_ANALYTIC_API_PASSWORD;
  try {
    await fetch(`${process.env.REACT_APP_ANALYTIC_API_URL}/sNextVisit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nextVisitData),
    });
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error('Error to POST sNextVisit fetch request to API', error);
    // return status 200 to avoid error in the front end
    return {
      statusCode: 200,
    };
  }
};
