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
  if (fetchMethod === 'GET') {
    delete requestOptions.body;
  }
  try {
    const response = await fetch(`http://localhost:3001${route}`, requestOptions);
    const fetchData = await response.json();
    return fetchData;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { handleAllFetchMethods };
