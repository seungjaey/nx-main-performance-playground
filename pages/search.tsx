import axios, { CancelToken } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

function newAbortSignal(timeoutMs: number) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

const fetchSeq = async (keyword: string) => {
  const { data } = await axios.get('/api/keyword', {
    params: {
      keyword,
    },
    signal: newAbortSignal(3000),
  });
  return data;
};

const SearchPage = () => {
  const [res, setRes] = useState(null);
  const [text, setText] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSeq(text);
        setRes(data);
      } catch (error) {}
    })();
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
