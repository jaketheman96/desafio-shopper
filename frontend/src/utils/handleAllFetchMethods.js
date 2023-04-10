const HOST = process.env.REACT_APP_API_HOST || "localhost:3001";
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || "http";

const handleAllFetchMethods = async (route, fetchMethod, body, token) => {
  const requestOptions = {
    method: fetchMethod,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      Authorization: token,
    },
  };
  if (fetchMethod === 'GET' || fetchMethod === 'DELETE') {
    delete requestOptions.body;
  }
  try {
    const response = await fetch(`${PROTOCOL}://${HOST}${route}`, requestOptions);
    const fetchData = await response.json();
    return fetchData;
  } catch (err) {
    return err;
  }
};

module.exports = { handleAllFetchMethods };
