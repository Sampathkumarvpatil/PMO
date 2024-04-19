import { useState } from "react";

export const useSaveDataToS3 = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function saveData(file_name, json_data) {
    try {
      const res = await fetch(process.env.SAVE_FILE_TO_S3, {
        method: "POST",
        headers: {
          ContentType: "application/json",
        },
        body: JSON.stringify({ file_name, json_data }),
      });
      if (!res.ok) throw new Error("Error while saving file from s3!!");
      await res.json();
      setSuccess(true);
      return { success, error };
    } catch (e) {
      console.error(e?.message || "Error while fetching data from s3..");
      setError(e?.message || "Error while fetching data from s3..");
    }
  }
  return { success, error, saveData };
};
