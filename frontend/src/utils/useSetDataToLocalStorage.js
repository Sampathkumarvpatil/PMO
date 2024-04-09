import { useEffect } from "react";

export const useSetDataToLocalStorage = (key, value) => {
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
};
