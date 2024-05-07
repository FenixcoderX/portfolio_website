/**
 * Makes a POST request to the server's sFirstVisit endpoint
 * @param event - The data to be sent in the request body
 */

exports.handler = async function (event, context) {

  // Check if the request is a POST request
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const firstVisitData = JSON.parse(event.body);
  // Add the password to the data object that needs to be sent to the API to authenticate the request
  firstVisitData.password = process.env.REACT_APP_ANALYTIC_API_PASSWORD;

  try {
    await fetch(`${process.env.REACT_APP_ANALYTIC_API_URL}/sFirstVisit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(firstVisitData),
    });
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error('Error to POST sFirstVisit fetch request to API', error);
    // return status 200 to avoid error in the front end
    return {
      statusCode: 200,
    };
  }
};
