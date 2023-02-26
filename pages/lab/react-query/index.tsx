import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const delay = () =>
  new Promise((resolve) => {
    const timerId = setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
      clearTimeout(timerId);
    }, 3000);
  });

const RandomDelay = () => {
  const { data } = useQuery(
    ['index'],
    () => {
      console.log('hit queryFn');
      return delay();
    },
    {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: true,
      cacheTime: 1500,
    },
  );
  return <div>{JSON.stringify(data)}</div>;
};

const ReactQueryPage = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <main>
      <h1>React-query</h1>
      <button type="button" onClick={() => setToggle((p) => !p)}>
        toggle
      </button>
      {toggle ? <RandomDelay /> : null}
    </main>
  );
};

export default ReactQueryPage;
