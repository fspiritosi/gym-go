import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        typeof value === "function" ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(`Error writing to local storage: ${error}`);
    }
  };

  return [storedValue, setValue];
};


//window.localStorage.setItem(key,JSON.stringify(initialValue))