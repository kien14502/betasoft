import { useState, useEffect } from 'react';

const useCountDown = (initial: number) => {
  const [counter, setCounter] = useState(initial);

  useEffect(() => {
    if (counter === 0) return;
    const onCounter = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(onCounter);
  }, [counter]);

  return {
    counter,
    setCounter,
  };
};

export default useCountDown;
