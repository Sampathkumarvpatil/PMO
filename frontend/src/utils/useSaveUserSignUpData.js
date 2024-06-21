import { useState } from "react";

export const useRegisterOrLoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState(null);
  const saveUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate an API call
      const res = await fetch(
        "https://si70ohe6hc.execute-api.us-east-1.amazonaws.com/default/pmologin",
        {
          method: "POST",
          body: JSON.stringify({ ...userData }),
        }
      );
      const jsonRes = await res.json();
      if (!jsonRes.success) {
        setError(jsonRes.message);
      } else if (userData?.operation === "login") {
        setData(jsonRes);
      }
    } catch (err) {
      setError("Username/validation Key already exists.");
    } finally {
      setIsLoading(false);
      if (!error) setSuccess(true);
    }
  };

  return { saveUser, isLoading, error, success, data };
};
