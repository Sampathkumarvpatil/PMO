import { useEffect, useState } from "react";

export const useGetLocalStorageData = (key, needsParsed) => {
  const [localStorageData, setLocalStorageData] = useState(null);
  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      setLocalStorageData(needsParsed ? JSON.parse(item) : item);
    }
  }, [key, needsParsed]);
  return localStorageData;
};
