import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useInput = <T>(value: T): [T, Dispatch<SetStateAction<T>>] => {
  const [input, setInput] = useState<T>(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  return [input, setInput];
};
