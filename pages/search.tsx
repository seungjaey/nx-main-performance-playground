import axios, { CancelToken } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

const fetchSeq = async (keyword: string, cancelToken: CancelToken) => {
  const { data } = await axios.get('/api/keyword', {
    params: {
      keyword,
    },
    cancelToken,
  });
  return data;
};

const SearchPage = () => {
  const [res, setRes] = useState(null);
  const [text, setText] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    (async () => {
      const data = await fetchSeq(text, source.token);
      setRes(data);
    })();
    return () => {
      source.cancel();
    };
  }, [text]);

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <div>{text}</div>
      <div>{JSON.stringify(res)}</div>
    </div>
  );
};

export default SearchPage;
