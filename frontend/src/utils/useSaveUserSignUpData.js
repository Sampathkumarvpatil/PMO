import { useState } from "react";

export const useRegisterOrLoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const saveUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate an API call
      await fetch(
        "https://m1gd69hczi.execute-api.us-east-1.amazonaws.com/default/pmologin",
        {
          method: "POST",
          headers: {
            ContentType: "application/json",
          },
          body: JSON.stringify({ ...userData }),
        }
      );
    } catch (err) {
      setError("Username/validation Key already exists.");
    } finally {
      setIsLoading(false);
      if (!error) setSuccess("User registered successfully..");
    }
  };

  return { saveUser, isLoading, error, success };
};
