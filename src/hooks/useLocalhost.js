import { useState, useEffect } from 'react';

const getValue = (key, initialValue) => {
  const savedValue = JSON.parse(localStorage.getItem(key));

  if (savedValue) return savedValue;

  if (initialValue instanceof Function) return initialValue;

  return initialValue;
};

export const UseLocalhost = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
