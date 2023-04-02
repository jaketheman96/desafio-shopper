import { useContext, useState } from 'react';
import ShopperContext from '../context/ShopperContext';

function useFetch() {
  const { setIsLoading } = useContext(ShopperContext);
  const [data, setData] = useState();
  const [error, setError] = useState();

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
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001${route}`, requestOptions);
      const fetchData = await response.json();
      setData(fetchData);
      return fetchData;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, handleAllFetchMethods };
}

export default useFetch;
