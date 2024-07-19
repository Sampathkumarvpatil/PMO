import { useState } from "react";

export const useSaveManualTestDataToS3 = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function saveManualTestData(data) {
    setIsLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SAVE_MANUAL_TEST_DATA, {
        method: "POST",

        body: JSON.stringify({ ...data }),
      });
      if (!res.ok) throw new Error("Error while saving manual data s3!!");
      await res.json();
      setSuccess(true);
      return { success, error };
    } catch (e) {
      console.error(e?.message || "Error while saving manual test data s3..");
      setError(e?.message || "Error while saving manual test data s3..");
    } finally {
      setIsLoading(false);
    }
  }
  return { success, error, saveManualTestData, isLoading };
};
