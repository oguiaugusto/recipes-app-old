import { useEffect, useState } from 'react';

export default function useFetch(apiFunction, query) {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      apiFunction(query).then((r) => {
        setResponse(r);
        setLoading(false);
      });
    } else {
      apiFunction().then((r) => {
        setResponse(r);
        setLoading(false);
      });
    }
  }, [apiFunction, query]);

  return [response, loading];
}
