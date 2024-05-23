import { useState } from "react";

export const useSaveDataToS3 = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function saveData(file_name, json_data, validation_key) {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://4wh4tjy3s1.execute-api.us-east-1.amazonaws.com/default/pmotojson",
        {
          method: "POST",
          headers: {
            ContentType: "application/json",
          },
          body: JSON.stringify({ file_name, json_data, validation_key }),
        }
      );
      if (!res.ok) throw new Error("Error while saving file from s3!!");
      await res.json();
      setSuccess(true);
      return { success, error };
    } catch (e) {
      console.error(e?.message || "Error while fetching data from s3..");
      setError(e?.message || "Error while fetching data from s3..");
    } finally {
      setIsLoading(false);
    }
  }
  return { success, error, saveData, isLoading };
};
